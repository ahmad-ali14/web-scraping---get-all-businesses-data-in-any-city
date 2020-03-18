
const {resolve} = require('path')

const USER_HOME = require('os').homedir()

function home () {
  return USER_HOME
}

const resolveHome = path =>
  path === '~'
    ? USER_HOME
    // I thought, nobody will use `'~\\path\\to'`, but only `'~/path/to'`
    : !~ path.indexOf('~/')
      // '~file'
      ? path
      // '~/file' -> '/Users/xxx/file'
      : USER_HOME + path.slice(1)

// The enhanced `path.resolve`
home.resolve = (...args) => resolve(...args.map(resolveHome))

module.exports = home
