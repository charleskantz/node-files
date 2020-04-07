const fs = require('fs');
const axios = require('axios');

if( process.argv[2].includes('http') ){
  let url = process.argv[2]
  webCat(url);
} else {
  let path = process.argv[2];
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

function webCat(url) {
  axios.get(url).then(function(resp) {
    console.log(resp.data);
  });
}