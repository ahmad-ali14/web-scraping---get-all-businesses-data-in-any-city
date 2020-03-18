const cheerio = require('cheerio');
const axios = require('axios');
const ObjectsToCsv = require('objects-to-csv');
const jsonfile = require('jsonfile')
var fs = require('fs');
var path = require('path')






var result = [];


const fetchData = async (url) => {
  const result = await axios.get(url);

  return cheerio.load(result.data);
}


const getResult = async (url) => {
  const $ = await fetchData(url);


  $('article').each((i, e) => {

    let id = $(e).attr('id');
    //console.log(id)
    let pharmacy = {};

    pharmacy.name = $("#" + id + '> div.businessCapsule--mainRow > div.businessCapsule--mainContent > div.row > div.businessCapsule--titSpons > a > h2 > span').text().replace(/\n/g, "");

    let contact = [];
    $("#" + id + '> div.businessCapsule--mainRow > div.businessCapsule--mainContent > div.row > div.businessCapsule--ctas > a').each(
      (i, e) => {
        contact.push($(e).attr('href'))
      })


    pharmacy.website = $("#" + id + '> div.businessCapsule--mainRow > div.businessCapsule--mainContent > div.row > div.businessCapsule--ctas > a').attr('href');


    pharmacy.phone = $("#" + id + '> div.businessCapsule--mainRow > div.businessCapsule--mainContent > div.row > div.businessCapsule--ctas > div.expand--content > div > div.phoneOption > div.business--telephoneContent > span.business--telephoneNumber').text().replace(/\n/g, "");

    $("#" + id + '> div.businessCapsule--mainRow > div.businessCapsule--mainContent > div.row > a > span').each(
      (i, e) => {
        if (i == 2) { return pharmacy.address = $(e).text().replace(/\n/g, ""); }
      }
    )

    result.push(pharmacy);


  });


  return result;

}






const generateCSV = async (data) => {
  const csv = new ObjectsToCsv(data);

  // Save to file:
  await csv.toDisk('./test.csv');

  console.log('CSV file created')

  // Return the CSV file as string:
  // console.log(await csv.toString());
}




const generateCSV_and_Json = async () => {
  await getResult("https://www.yell.com/s/pharmacies-harrow.html");

  generateCSV(result);

  const file = './data.json'

  jsonfile.writeFile(file, result, function (err) {
    if (err) console.error(err)
    console.log('JSON file created')
  })

}


const generateXslx = async () => {

  await getResult("https://www.yell.com/s/pharmacies-harrow.html");

  var jsn = JSON.stringify(result);
 // console.log('res', result)


  jsn = JSON.parse(jsn, { encoding: 'utf-8' })
 // console.log('jsn ', jsn)

  var data = '';
  
  for (var i = 0; i < jsn.length; i++) {
    data = data + jsn[i].name + '\t' + jsn[i].website + '\t' + jsn[i].phone + '\t' + jsn[i].address + '\n';
  }

  fs.appendFile('data.xls', data, (err) => {
    if (err) throw err;
    console.log('XLS File created');
  });

}



generateCSV_and_Json();
generateXslx();