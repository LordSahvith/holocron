'use strict';

/**
 * @namespace Page
 */

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
server.extend(module.superModule);

server.get(
    'IncludeHomeHeaderMenu',
    server.middleware.include,
    cache.applyDefaultCache,
    function (req, res, next) {
        var Resource = require('dw/web/Resource');
        var catalogMgr = require('dw/catalog/CatalogMgr');
        var Categories = require('*/cartridge/models/pdCategories');
        var homeRootCategory = catalogMgr.getCategory(Resource.msg('pd.homeNavRoot', 'cricutPageDesigner', null));

        var topLevelCategories = homeRootCategory.hasOnlineSubCategories() ?
            homeRootCategory.getOnlineSubCategories() : null;

        res.render('/components/header/homePageNav', new Categories(topLevelCategories));
        next();
    }
);

module.exports = server.exports();
