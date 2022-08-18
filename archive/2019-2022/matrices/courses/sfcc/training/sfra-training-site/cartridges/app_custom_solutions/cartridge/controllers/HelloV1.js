'use strict';

var server = require('server');

server.get('Start', function (req, res, next) {

	res.print('<html><body><h1>Hello World</h1></body></html>');
    next();
	 
});

module.exports = server.exports();
