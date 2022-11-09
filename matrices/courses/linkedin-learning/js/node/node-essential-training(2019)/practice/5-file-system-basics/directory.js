const fs = require('fs');

if (fs.existsSync('storage-files')) {
    console.log('Directory already exists.');
} else {
    fs.mkdir('storage-files', (error) => {
        if (error) throw error;

        console.log('Directory created.');
    });
}
