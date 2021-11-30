'use strict';

var server = require('server');
var ISML = require('dw/template/ISML');
var URLUtils = require('dw/web/URLUtils');
var Transaction = require('dw/system/Transaction');
//in the code below, get the form from the metadata preferences.xml

var preferencesForm = 
// in the code below require the module that provides CSRF protection
var csrfProtection =

// in the code below, require the module that provides user verification
var userLoggedIn = 


server.get('Start',
	// insert specified middleware (Require customer login, enforce the HTTPS protocol, and generate a CSRF token.)
	function (req, res, next) {
		// clear the form  

		// Preload the form with current user selections. 		
		// The first field is done as an example. 
		customer.profile.custom.interestApparel==true?preferencesForm.interestApparel.checked="checked":'';

		
		res.render('account/user/editpreferences.isml', {
			preferencesForm: preferencesForm
		});
		next();
	});



server.post('HandleForm',
csrfProtection.validateRequest,
	// insert specified middleware (make sure that we have https protocol using the middleware server.middleware.https
	function (req, res, next) {
		// Persist the data. You will need to update the profile within a Transaction.
		//Hint:  customer.profile.custom.interestApparel=preferencesForm.interestApparel.value;
		
		//redirect user to Account-Show  (use res.redirect(...))
	
		next();

	});

module.exports = server.exports();
