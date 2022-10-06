'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var ProductFactory = require("*/cartridge/scripts/factories/product");
var ProductMgr = require('dw/catalog/ProductMgr');
var ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation.js');
var Resource = require('dw/web/Resource');
var URLUtils = require('dw/web/URLUtils');
var GAEventsBuilder = require("../../utilities/GAEventsBuilder");

/**
 * Render logic for the commerce_assets.bundleProductTile component
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Platform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var content = context.content;

    var productFctry;
    var productMgr;
    var productUrl;
    let productImage;

    if(content.product) {
        productFctry = ProductFactory.get({pid: content.product.ID}); //Needed to get Currency Symbol
        productMgr = ProductMgr.getProduct(content.product.ID); //Needed to get Product Image

        productImage = content.productImg ? content.productImg : productMgr.getImage('large');

        productUrl= URLUtils.url('Product-Show', 'pid', productFctry.id).relative().toString();
        model.productName = content.tileTitle ? content.tileTitle : productFctry.productName;
        model.price = productFctry.price;
        model.productMgr = productMgr;
        model.productImage = ImageTransformation.url(productImage, { device: 'tablet' });
        model.productDescription = content.productDescription ? content.productDescription : productFctry.shortDescription;
        model.productCTAText = content.productCTAText ? content.productCTAText : Resource.msg("cta.text", "bundleProduct", null);
        model.productCTALink = content.productCTALink ? content.productCTALink : productUrl;
    }
    model.gaEvent = GAEventsBuilder(
        content.category,
        content.action,
        content.label
    );

    return new Template('experience/components/commerce_assets/bundleProductTile').render(model).text;
};