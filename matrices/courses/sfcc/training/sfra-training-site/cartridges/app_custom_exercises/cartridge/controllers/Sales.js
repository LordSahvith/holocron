'use strict';

var server = require('server');


server.get('Show', function (req, res, next) {

    //define a variable named PageMgr that requires the dw.experience.PageMgr API
    
    //get the page with the specific, hard-coded id

    //Hint: Use hasVisibilityRules() and isVisible() checks
    //Hint: use PageMgr.renderPage method and res object to render the page
    //Hint: don't forget to cover the else condition, because in our exercise hasVisibilityRules() is false

    next();

});

module.exports = server.exports();
