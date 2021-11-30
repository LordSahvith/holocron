'use strict';

var server = require('server');

//in the code below, require the use of product.js from the scripts/factories folder of base
var ProductFactory = 

server.get('Show', function (req, res, next) {

//in the code below, get the query string from req
    var params = 
//in the code below, get product from ProductFactory by passing query string from the code before (hint study product.js)
	var theProduct =

	if (theProduct.id) {

		// render productfound.isml, passing the theProduct
		//(study productfound.isml to see which variable is to be passed to pdict)
	}
	else {

		// render productnotfound.isml, passing the params.pid
		//(study productnotfound.isml to see which variable is to be passed to pdict)
		
	}

    next();
});

module.exports = server.exports();

