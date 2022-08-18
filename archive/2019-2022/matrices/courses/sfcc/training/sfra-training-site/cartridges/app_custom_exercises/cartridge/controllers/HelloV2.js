'use strict';

var server = require('server');

server.get('Start', function (req, res, next) {

	/*within the function, render the hello.isml template, 
	 and declare the value of param1 which you saw 
	 in hello.isml.  param1 should equal "Hello from ISML"
	*/

    var x = 4;
    var y = x++;
    var z = x + y;

    res.render("hello", {param1: "Hello from ISML."});
    res.render("hello2", {param1: "Hello from 2nd ISML.", param2: "Second Parameter."}); // this overwrites the line above and becomes the active template
	
	next();
	
});

module.exports = server.exports();