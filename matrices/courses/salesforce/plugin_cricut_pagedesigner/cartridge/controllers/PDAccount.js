'use strict';

/**
 * @namespace Account
 */

var server = require('server');

/**
 * Account-HomeHeader : The Account-HomeHeader endpoint is used as a remote include to include the login/account menu in the header
 * @name Base/Account-Header
 * @function
 * @memberof Account
 * @param {middleware} - server.middleware.include
 * @param {querystringparameter} - mobile - a flag determining whether or not the shopper is on a mobile sized screen this determines what isml template to render
 * @param {category} - sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.get('HomeHeader', server.middleware.include, function (req, res, next) {
    var template = 'components/header/homeAccount';
    res.render(template, { name:
        req.currentCustomer.profile ? req.currentCustomer.profile.firstName : null
    });
    next();
});

module.exports = server.exports();
