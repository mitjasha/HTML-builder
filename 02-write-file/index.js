const readline = require('readline');
const fs = require('fs');
const path = require('path');
// const process = require('process');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });

const writeableStream = fs.createWriteStream(path.join(__dirname, 'text.txt'), {flags: 'a'});

const exit = (data) => {
  if(data === 'exit') {
    process.stdout.write('Thank you for your valuable feedback');
    writeableStream.end();
    rl.close();
    return false;
  }
  return true;
};

rl.question('What do you think of Node.js? ', (answer) => {
  if (exit(answer)){
    // console.log(`Your answer: ${answer}`);
    writeableStream.write(answer + '\n');
  }
});

rl.addListener('line', (input) => {
  if (exit(input)){
    writeableStream.write(input + '\n');
  }
});

rl.on('SIGINT', () => {
  exit('exit');
});

