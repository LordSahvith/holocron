'use strict';

// get server object
var server = require('server');

// use server objects get method to set rout to Show
server.get('Show', function (req, res, next) {
    // render promo.isml
    res.render("promo");
    // continue
    next();
});

// export code to work
module.exports = server.exports();