[![Build Status](https://travis-ci.org/kaelzhang/node-home.svg?branch=master)](https://travis-ci.org/kaelzhang/node-home)
[![Coverage](https://codecov.io/gh/kaelzhang/node-home/branch/master/graph/badge.svg)](https://codecov.io/gh/kaelzhang/node-home)

# home

A tiny utility to get the home directory, or resolve a path begins with `'~'`, with cross-platform compatibility.

Since `2.0.0`, `home only supports node >= 5.12.0`

## Install

```sh
$ npm i home
```

## Usage

```js
const home = require('home')

home()              // Mac && Linux: '/Users/kael', Windows: '\\Users\\kael'
home.resolve('~')   // '/Users/kael'

const some_path = '~/workspace'
home.resolve(some_path)         // '/Users/kael/workspace'
home.resolve(some_path, 'abc')  // '/Users/kael/workspace/abc'
```

## home()

Returns `path` the home directory specified by operating system.

## home.resolve([from...], to)

Resolves `to` to an absolute path, if `to` begins with `'~'`, it will be cooked before `path.resolve()`d.

```js
home.resolve('~/file') // 'Users/kael/file'
```

The usage of `home.resolve` is very similar to [`path.resolve`](http://nodejs.org/api/path.html#path_path_resolve_from_to)

Another way to think of it is as a sequence of cd commands in a shell.

```js
home.resolve()
// -> current directory

home.resolve('foo/bar', '~/file/', '..', 'a/../subfile')
// -> '/Users/kael/subfile'
```

Is equivalent to:

```js
home.resolve('foo/bar', '/Users/kael/file/', '..', 'a/../subfile')
```

Is similar to:

```sh
cd foo/bar
cd ~/file/
cd ..
cd a/../subfile
pwd
```

## What about `home.relative()`, `home.join()` ?

For now, `home` doesn't support those, which I thought is unnecessary to make this module too complicated.

I'd rather `home.resolve()` the directories, before `path.join()`.

```js
var dir = '~/dir'
dir = home.resolve(dir)
path.join(dir, './abc')
```

## License

May be freely distributed under the [MIT license](https://raw.githubusercontent.com/kaelzhang/node-home/master/LICENSE).

Copyright (c) Kael Zhang and [other contributors](https://github.com/kaelzhang/node-home/graphs/contributors).
