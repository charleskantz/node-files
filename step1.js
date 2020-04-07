const fs = require('fs');

let path = process.argv[2];

function cat(path) {
  fs.readFile(path, 'utf8', function(err, data) {
    if(err){
      console.log("ERRORRRR");
      process.exit(1);
    }
    console.log(data);
  });
}
// run function
cat(path);