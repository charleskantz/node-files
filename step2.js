const fs = require('fs');
const axios = require('axios');

let processArg = process.argv[2]

if( processArg.startsWith('http://') ){
  let url = processArg
  webCat(url);
} else {
  let path = processArg;
  cat(path);
}

function cat(path) {
  fs.readFile(path, 'utf8', function(err, data) {
    if(err){
      console.log("ERRORRRR");
      process.exit(1);
    }
    console.log(data);
  });
}

async function webCat(url) {
  try{
    let response = await axios.get(url)
    console.log("this is our response data", response.data);

  }catch(error){
    console.log("unable  to fetch URL!");
    process.exit(1);
  }
}