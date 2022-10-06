'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

/**
 * Render logic for the storefront.addToCartButton component
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var content = context.content;

    model.btnColor = content.btnColor;
    model.product = content.product;
    model.productId = content.product.ID;
    model.buttonAriaLabel = content.buttonAriaLabel ? ` aria-label="` + content.buttonAriaLabel + `"` : '';
    model.buttonColor = model.btnColor !== 'default' ? ' pd-button--' + model.btnColor : '';

    return new Template('experience/components/buttons/addToCartButton').render(model).text;
};
