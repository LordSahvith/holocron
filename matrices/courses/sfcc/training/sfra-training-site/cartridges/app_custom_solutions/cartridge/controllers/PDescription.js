'use strict';

var server = require('server');
var cacheHandler = require('*/cartridge/scripts/cacheHandler');

server.get('Show',cacheHandler.setCache, 
    function (req, res, next) {

    res.render('promodescription');
    next();

});

module.exports = server.exports();