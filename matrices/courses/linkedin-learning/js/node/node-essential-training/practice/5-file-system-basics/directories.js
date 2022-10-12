const fs = require('fs');

// fs.renameSync('./storage-files', './storage');


// COPY EXISTING DIRECTORY
let fileNames = [];

fs.readdirSync('./storage').forEach((file) => {
    fileNames.push(file);
});

fileNames.forEach((file) => {
    if (fs.existsSync('storage-test')) {
        console.log('Directory already exists.');
    } else {
        fs.mkdir('storage-test', (error) => {
            if (error) throw error;
    
            console.log('Directory created.');
        });
    }

    fs.copyFile(`./storage/${file}`, `./storage-test/${file}`, (error) => {
        if (error) throw error;

        console.log(`copied file: ${file}`);
    });
});

// DELETE DIRECTORY
setTimeout(() => {
    // remove files first
    fs.readdirSync('./storage-test').forEach((file) => {
        fs.unlinkSync(`./storage-test/${file}`);

        console.log(`removed file: ./storage-test/${file}.`);
    });

    // remove directory
    fs.rmdir('./storage-test', (error) => {
        if (error) throw error;

        console.log('removed directory: ./storage-test.');
    });
}, 4000);
