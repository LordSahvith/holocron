const fs = require('fs');

fs.renameSync('./assets/colors.json', './assets/colorsData.json');

fs.rename('./assets/testFile.md', './storage-files/testFile.md', (error) => {
    if (error) throw error;

    console.log('File renamed');
});

setTimeout(() => {
    fs.unlinkSync('./assets/test.jpg');
}, 4000);
