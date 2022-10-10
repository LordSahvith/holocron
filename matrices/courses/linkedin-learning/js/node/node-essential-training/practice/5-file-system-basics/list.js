const fs = require('fs');

console.log('reading files...');

/* SYNCHRONOUS */
// const files = fs.readdirSync('./assets/');
// console.log('completed');
// console.log(files);

/* ASYNCHRONOUS */
fs.readdir('./assets/', (err, files) => {
    if (err) {
        throw err;
    }
    console.log('completed');
    console.log(files);
});
