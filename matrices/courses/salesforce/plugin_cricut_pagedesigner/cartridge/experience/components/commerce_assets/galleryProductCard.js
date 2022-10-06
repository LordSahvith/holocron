'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var ProductMgr = require('dw/catalog/ProductMgr');
var ProductFactory = require("*/cartridge/scripts/factories/product");
var URLUtils = require('dw/web/URLUtils');
var ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation');


/**
 * Render logic for the commerce_assets.galleryProductCard component
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Platform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var content = context.content;

    var product = false;

    if(content.product !== null) {
        product = ProductMgr.getProduct(content.product.ID);
        model.product = product;
        var productFromFactory = ProductFactory.get({pid: content.product.ID}); //Needed to get Currency Symbol
        model.productUrl = URLUtils.url('Product-Show', 'pid', productFromFactory.id).relative().toString();

        if(content.overrideImage) {
            model.productImage = {
                absURL: ImageTransformation.url(content.overrideImage, {}),
                alt: product.name,
                title: product.name
            };
        } else {

            if(product.getImage('small')) {
                model.productImage = product.getImage('small');
            } else if(product.getImage('medium')) {
                model.productImage = product.getImage('medium');
            } else if(product.getImage('large')) {
                model.productImage = product.getImage('large');
            } else {
                model.productImage = null;
            }

        }
    }

    return new Template('experience/components/commerce_assets/galleryProductCard').render(model).text;
};
