let fs = require('fs');
let https = require('https');

var myPhotoLocation = 'https://raw.githubusercontent.com/LordSahvith/holocron/master/matrices/stream-videos/images/logo/logo-transparent.png';

https.get(myPhotoLocation, function(response) {
    response.pipe(fs.createWriteStream(__dirname + '/mylogo.png'));
});