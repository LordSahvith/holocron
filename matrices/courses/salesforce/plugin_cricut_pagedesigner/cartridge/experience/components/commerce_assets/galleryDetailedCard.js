'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation');
var ProductMgr = require('dw/catalog/ProductMgr');

/**
 * Render logic for the commerce_assets.galleryDetailedCard component
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Platform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var content = context.content;

    let product;
    let productImage;
    let headerText;

    if(content.product) {
        product = ProductMgr.getProduct(content.product.ID);

        productImage = content.productImage ? content.productImage : product.getImage('large');

        headerText = content.headerText ? content.headerText : product.name;
    } else {
        productImage = content.productImage;
        headerText = content.headerText;
    }

    model.headerText = headerText;
    model.bodyText = content.bodyText;
    model.productImage = ImageTransformation.url(productImage, { device: 'mobile' });
    model.specialAttributes = context.content.specialAttributes ? "data-special='" + context.content.specialAttributes + "'" : "";

    return new Template('experience/components/commerce_assets/galleryDetailedCard').render(model).text;
};