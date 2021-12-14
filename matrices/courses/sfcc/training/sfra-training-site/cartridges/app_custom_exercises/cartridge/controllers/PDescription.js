'use strict';

var server = require('server');
var CacheHandler = require('*/cartridge/scripts/cacheHandler');

server.get('Show', CacheHandler.setCache, function (req, res, next) {
    res.render('promodescription');

	next();
});

module.exports = server.exports();