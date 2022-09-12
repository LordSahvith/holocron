'use strict';
/* global request, response */

var ISML = require('dw/template/ISML');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for the storepage.
 *
 * @param {dw.experience.PageScriptContext} context The page script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var page = context.page;
    model.page = page;

    var content = context.content;
    if (content.category) {
        var categoryId = content.category.ID;

        var ProductSearchModel = require('dw/catalog/ProductSearchModel');
        var searchHelper = require('*/cartridge/scripts/helpers/searchHelpers');
        var pageMetaHelper = require('*/cartridge/scripts/helpers/pageMetaHelper');

        var apiProductSearch = new ProductSearchModel();
        var params = { cgid: categoryId };
        apiProductSearch = searchHelper.setupSearch(apiProductSearch, params);

        // we do not need to execute the search, that is handled by a component, we just need the meta tags
        pageMetaHelper.setPageMetaTags(request.pageMetaData, apiProductSearch);
    }

    // automatically register configured regions
    model.regions = PageRenderHelper.getRegionModelRegistry(page);

    if (PageRenderHelper.isInEditMode()) {
        var HookManager = require('dw/system/HookMgr');
        HookManager.callHook('app.experience.editmode', 'editmode');
        model.resetEditPDMode = true;
    }

    var expires = new Date();
    expires.setHours(expires.getHours() + 1); // this handles overflow automatically
    response.setExpires(expires);

    model.CurrentPageMetaData = PageRenderHelper.getPageMetaData(page);

    // render the page
    // force ISML rendering to work around hook render order
    // old: return new Template('experience/pages/pd-homePageCLP').render(model).text;
    ISML.renderTemplate('experience/pages/pd-homePageCLP', model);
    return '';
};
