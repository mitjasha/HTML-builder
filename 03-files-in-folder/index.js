const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'),{withFileTypes: true}, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    if (file.isFile()) {
      fs.stat(path.join(__dirname, 'secret-folder', file.name), (err, stats) => {
        if (err) throw err;
  
        process.stdout.write(`${file.name.split('.')[0]} - ${file.name.split('.')[1]} - ${(stats.size).toFixed(0)} bytes\n`);
      });
    }
  });
});