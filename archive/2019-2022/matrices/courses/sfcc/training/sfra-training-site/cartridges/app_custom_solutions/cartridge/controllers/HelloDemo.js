//Demo of how to print a JSON object to the screen. 
//Helpful in creating AJAX service points.
'use strict';

var server = require('server');

server.get('Start', function (req, res, next) {

    res.json({ value: 'Hello World'});
    next();
	
});

module.exports = server.exports();