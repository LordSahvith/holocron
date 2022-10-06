'use strict';

/* global request */

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');
var productHelper = require('*/cartridge/scripts/helpers/productHelpers.js');
var Site = require('dw/system/Site');
var URLUtils = require('dw/web/URLUtils');
var ISML = require('dw/template/ISML');

/**
 * Render logic for the product detail component
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();

    var component = context.component;
    model.regions = PageRenderHelper.getRegionModelRegistry(component);
    var product = context.content.product;

    var params = { pid: product.ID };
    var productHelperResult = productHelper.showProductPage(params, request.pageMetaData);
    var productType = productHelperResult.product.productType;

    var template;
    if (!productHelperResult.product.online && productType !== 'set' && productType !== 'bundle') {
        template = new Template('error/notFound');
        template.setStatusCode(404);
        return template.render().text;
    }

    model.product = productHelperResult.product;
    model.addToCartUrl = productHelperResult.addToCartUrl;
    model.resources = productHelperResult.resources;
    model.breadcrumbs = productHelperResult.breadcrumbs;
    model.canonicalUrl = productHelperResult.canonicalUrl;
    model.schemaData = productHelperResult.schemaData;
    // add value for PD page for use in pdict
    model.isPdPage = true;

    // Get GTM working on PD PDP
    var DataModel = require('*/cartridge/models/digitalData/enhancedEcommerce/data');
    var analyticsHelper = require('*/cartridge/scripts/helpers/analyticsHelpers');
    var digitalData = {};

    digitalData = (new DataModel(model, DataModel.EVENT_PRODUCT_DETAILS_VIEW)).stringify();
    analyticsHelper.getProductVariationDigitalData(model);

    model.digitalDataJson = digitalData;

    // custom product data for PDP
    var cricutPdpDrawers = Site.current.getCustomPreferenceValue('cricutPdpDrawers');
    var zoomImageUrl = URLUtils.url('Product-ProductZoomImage', 'pid', product.ID).toString();
    var sortedVariationProducts = productHelperResult.product.variationAttributes ? productHelper.getSortedVariationPrices(productHelperResult.product.variationAttributes[0].values) : null;

    model.cricutPdpDrawers = cricutPdpDrawers;
    model.zoomImageUrl = zoomImageUrl;

    model.accessMessage = productHelper.getAccessMessageViewData(productHelperResult.product);

    if (productHelperResult.product.variationAttributes) {
        model.product.variationAttributes[0].values = sortedVariationProducts ? sortedVariationProducts : null;
    }

    model.productBadge = productHelper.showProductBadge(productHelperResult.product);

    ISML.renderTemplate('experience/components/dynamic/' + productHelperResult.template, model);
    return '';
};
