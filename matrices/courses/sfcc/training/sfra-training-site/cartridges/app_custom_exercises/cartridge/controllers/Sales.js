'use strict';

var server = require('server');

server.get('Show', function (req, res, next) {

    //define a variable named PageMgr that requires the dw.experience.PageMgr API
    var PageMgr = require('dw/experience/PageMgr');

    //get the page with the specific, hard-coded id
    var page = PageMgr.getPage('salepage');

    //Hint: Use hasVisibilityRules() and isVisible() checks
    if (page != null && page.hasVisibilityRules()) {
        if (page.isVisible()) {
            //Hint: use PageMgr.renderPage method and res object to render the page
            res.print(PageMgr.renderPage(page.ID, {}));
        }
    } else {
        //Hint: don't forget to cover the else condition, because in our exercise hasVisibilityRules() is false
        res.print(PageMgr.renderPage(page.ID, ""));
    }

    next();
});

module.exports = server.exports();
