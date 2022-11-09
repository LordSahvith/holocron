const fs = require('fs');

/* SYNCHRONOUS */
// const text = fs.readFileSync('./assets/Readme.md', 'utf-8');
// console.log(text);

/* ASYNCRHONOUS */
fs.readFile('./assets/Readme.md', 'utf-8', (error, text) => {
    if (error) {
        console.log(`An error has occured: ${error}`);
        return;
    }
    
    console.log('file contents read');
    console.log(text);
});


fs.readFile('./assets/alex.jpg', (error, img) => {
    if (error) {
        console.log(`An error has occured: ${error}`);
        return;
    }

    console.log('file contents read');
    console.log(img);
});
