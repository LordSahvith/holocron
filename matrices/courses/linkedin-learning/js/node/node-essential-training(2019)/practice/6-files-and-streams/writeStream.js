// process.stdout.write('hello');
// process.stdout.write(' world\n');

const fs = require('fs');
const writeStream = fs.createWriteStream('./assets/myText.txt', 'utf-8');
const readStream = fs.createReadStream('./assets/lorum-ipsum.md', 'utf-8');

// writeStream.write('hello');
// writeStream.write(' world\n');

// process.stdin.on('data', (data) => {
//     writeStream.write(data);
// });

// copies from readstream and writes to writestream
// readStream.on('data', (data) => {
//     writeStream.write(data);
// });

// takes user input and writes to file
// process.stdin.pipe(writeStream);

// copies file contents and writes to file
readStream.pipe(writeStream);
