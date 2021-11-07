const fs = require('fs');
const path = require('path');
const stream = require('node:stream');
const readline = require('readline');

fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
  if (err) throw err;
});