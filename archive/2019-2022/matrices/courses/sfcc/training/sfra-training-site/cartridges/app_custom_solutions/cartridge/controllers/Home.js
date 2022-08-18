//This controller shows that the value can come before (prepend) or after (append) the route runs. 
'use strict';

var server = require('server');
//TODO inherit functionality with module.superModule by using the extend method
server.extend(module.superModule);

//TODO insert functionality before the Show Route using server.prepend
server.prepend('Show', function (req, res, next) {
    //TODO in the code below, get ViewDta from  res
    var viewData = res.getViewData(); 
    //TODO set a viewData variable 'detailText' with value 'General Company Details, no promo at this time' in the code below 
    viewData.detailText = 'General Company Details';
    
    next();
});


/*
 * Checks the query string for promo and its value in the URL. 
 * If the query string has ?promo=1, then it appends the route with different data. 
 */
//TODO modify the Show Route by using server.append
server.append('Show', function (req, res, next) {

    if (req.querystring.promo == 1) {
		// This example shows an alternative to getting the view data like you did in prepend
        res.setViewData(
            { detailText: 'Home with Promo (All Bags for Sale this week).' }
        );
        
    }

    next();
});

module.exports = server.exports();
