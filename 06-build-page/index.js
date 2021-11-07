const fs = require('fs');
const path = require('path');
const template = fs.createReadStream(path.join(__dirname, 'template.html'));

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, () => {});
console.log(template);

