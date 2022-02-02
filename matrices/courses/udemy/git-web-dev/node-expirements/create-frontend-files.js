let fs = require("fs");

let htmlFile = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
    <script src="main.js" async></script>
</head>
<body>

</body>
</html>
`;

fs.writeFile(__dirname + "/index.html", htmlFile, function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log("html file built.");

    // fs.open(__dirname + "/index.html", "r+", function (err, f) {
    //   if (err) {
    //     return console.error(err);
    //   }
    //   console.log(f);
    //   console.log("File opened!!");
    // });
  }
});

fs.writeFile(__dirname + "/style.scss", "", function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log("sass file built.");
  }
});

fs.writeFile(__dirname + "/main.js", "", function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log("js file built.");
  }
});
