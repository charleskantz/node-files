const fs = require('fs');
const axios = require('axios');

let newFile, content;

// Set variables depending on flag presence
if ( process.argv[3] && process.argv[2] === '--out' ) {
  newFile = process.argv[3];
  content = process.argv[4];
} else {
  content = process.argv[2];  // if no other args present
  newFile = null;  // used as arg in functions to flag if content should be written in a new file
}

whichCat(content);

function whichCat(content) {
  // route request based on data content
  if ( content.startsWith('http://') ) {
    webCat(content, newFile);  // website passed
  } else {
    cat(content, newFile);  // file passed
  }
}

// reading a file, will print contents. If flag is not null it will pass to write function
function cat(filePath, flag=null) {
  fs.readFile(filePath, 'utf8', function(err, data) {
    if ( err ) {
      console.log("ERRORRRR");
      process.exit(1);
    }
    console.log('inside cat: file data: ', data);
    if ( flag ) writeNewFile(newFile=newFile ,content=data);
  });
}

// scraping website for HTML, if flag is not null it will pass to write function
async function webCat(url, flag=null) {
  try {
    let response = await axios.get(url);
    console.log("this is our response data", response.data);
    if ( flag ) {
      writeNewFile(newFile=newFile, content=response.data);
    }
  } catch ( error ) {
    console.log("unable to fetch URL!", error);
    process.exit(1);
  }
}

// if flag was present, contents are saved in new file
function writeNewFile(newFile, content){
  fs.writeFile(newFile, content, "utf8", function(err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log('Successfully wrote to file: ', newFile);
  });
}