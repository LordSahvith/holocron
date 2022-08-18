//This controller has two middleware steps. 
'use strict';

var server = require('server');

server.get('Show', function (req, res, next) {

	res.print('<html><body><h1>This is the original Show Route.</h1></body></html>');
	next();

});

server.get('Start', function (req, res, next) {

	res.print('<html><body><h1>This is the original Start Route.</h1></body></html>');
    next();
	 
});

module.exports = server.exports();
