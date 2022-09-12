'use strict';

/**
 * @namespace PDPage
 */

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var decodeUrl = require('*/cartridge/scripts/helpers/decodeurl');

server.get(
    'Css',
    server.middleware.include,
    cache.applyDefaultCache,
    function (req, res, next) {
        var staticUrl = decodeUrl.getStatic(res.getViewData());

        res.render('utils/csspass', {
            url: staticUrl
        });

        return next();
    }
);

server.get(
    'Js',
    server.middleware.include,
    cache.applyDefaultCache,
    function (req, res, next) {
        var staticUrl = decodeUrl.getStatic(res.getViewData());

        res.render('utils/jspass', {
            url: staticUrl
        });

        return next();
    }
);

server.get(
    'Template',
    server.middleware.include,
    cache.applyDefaultCache,
    function (req, res, next) {
        var viewData = res.getViewData();
        var path = decodeUrl.getPath(viewData);

        res.render(path, viewData);

        return next();
    }
);

server.get(
    'ProductTemplate',
    server.middleware.include,
    cache.applyDefaultCache,
    function (req, res, next) {
        var ProductFactory = require('*/cartridge/scripts/factories/product');
        var viewData = res.getViewData();
        var query = decodeUrl.getQuery(viewData);

        var product = ProductFactory.get({ pid : query.pid});

        viewData.product = product;

        res.render(query.template, viewData);

        return next();
    }
);

server.get(
    'CountrySelector',
    cache.applyDefaultCache,
    function (req, res) {
        var PageMgr = require('dw/experience/PageMgr');
        var page = PageMgr.getPage('country-selector');
        res.base.writer.print(PageMgr.renderPage(page.ID, ""));
    }
);

module.exports = server.exports();
