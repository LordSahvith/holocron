const fs = require("fs");

fs.readdir("./", function (err, files) {
    if (err) {
        throw err;
    }
    console.log(files);
});

fs.readFile("./readme.md", "UTF-8", (err, ipsum) => {
    console.log(ipsum);
});

console.log("reading files...");
