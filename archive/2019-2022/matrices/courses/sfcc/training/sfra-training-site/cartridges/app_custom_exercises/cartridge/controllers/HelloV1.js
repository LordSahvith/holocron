'use strict';

//require the server module
var server = require('server');

var name = "Lord Savith";

//define the route using the server.get method and Start function
server.get('Start', function (req, res, next) {
	//print Hello World using h1 tags directly to the response 
    res.print("<h1>Hello World!</h1>");
    res.print(`<h1>Hello ${name}!</h1>`); // res.print just prints text and the browser interprets html
    res.print("<h1>Hello " + name + "!</h1>");

	//execute the next function to notify the server that you're done with a step	
    next();
});

//call server.exports() to register all functions
module.exports = server.exports();
