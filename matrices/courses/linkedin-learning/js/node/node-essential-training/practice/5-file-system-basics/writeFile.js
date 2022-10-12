const fs = require('fs');

const md = `
# This is a new file

We can write text to a file with fs.writeFile

*fs.readdir
*fs.readFile
*fs.writeFile
`;

fs.writeFile('./assets/testFile.md', md.trim(), (error) => {
    if (error) {
        throw error;
    }

    console.log('new file created');
});
