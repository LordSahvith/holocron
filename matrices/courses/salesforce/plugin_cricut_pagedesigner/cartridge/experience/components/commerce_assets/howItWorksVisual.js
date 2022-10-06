'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation.js');

/**
 * Render logic for the How It Works Visual Component
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var content = context.content;

    let image = content.imgSrc ? ImageTransformation.url(content.imgSrc, { device: 'mobile' }, 'png') : null;
    let image2x = content.imgSrc ? ImageTransformation.url(content.imgSrc, { device: 'mobile2x' }) : null;

    model.imgSrc = image ? image : null;
    model.imgSrcWith2x = image ? image + ', ' + image2x + ' 2x' : null;

    model.imgAlt = content.imgAlt ? content.imgAlt : '';

    return new Template('experience/components/commerce_assets/howItWorksVisual').render(model).text;
};
