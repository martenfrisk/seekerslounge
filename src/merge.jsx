const jsonConcat = require('json-concat');
const fs = require('fs');

// an array of filenames to concat
const files = [];

const theDirectory = './transcripts'; // or whatever directory you want to read
fs.readdirSync(theDirectory).forEach((file) => {
  // you may want to filter these by extension, etc. to make sure they are JSON files
  files.push(file);
})

// pass the "files" to json concat
jsonConcat({
  src: './transcripts',
  dest: "./result.json"
}, function (json) {
  console.log(json);
});