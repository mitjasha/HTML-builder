const fs = require('fs');
const path = require('path');
// const template = fs.createReadStream(path.join(__dirname, 'template.html'));

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, () => {});
// console.log(template);

// ==========COPY ASSETS=========
const copy = async (src, target) => {
  await fs.mkdir(target, {recursive: true}, () => {});
  fs.readdir(src, {withFileTypes: true}, (err, files) => {
    files.forEach((file) => {
      let srcPath = path.join(src, file.name);
      let targetPath = path.join(target, file.name);
      if(file.isDirectory()) {
        copy(srcPath, targetPath);
      } else {
        fs.copyFile(srcPath, targetPath,() => {});
      }
    });
  });
};

const src = path.join(__dirname, 'assets');
const target = path.join(__dirname, 'project-dist');

const copyFolder = async (src, target) => {
  await fs.mkdir(target, {recursive: true}, () => {});
  const newFolder = path.join(target, 'assets');
  await copy(src, newFolder);
};

copyFolder(src, target);

// ===========STYLES========
const styles = fs.createWriteStream('./06-build-page/project-dist/style.css', 'utf-8');

fs.readdir(path.join(__dirname, 'styles'),{ withFileTypes: true }, (err, files) => {
  if (err) throw err;
    
  files.forEach(file =>{
    fs.stat(path.join(__dirname, 'styles', file.name), (err, stats) => {
      if (err) throw err;
        
      if (stats.isFile() && path.extname(file.name) === '.css'){
        const input = fs.createReadStream(path.join(__dirname, 'styles', file.name));
          
        input.on('data', partData => styles.write(partData + '\n'));
      }
    });
  });
});

