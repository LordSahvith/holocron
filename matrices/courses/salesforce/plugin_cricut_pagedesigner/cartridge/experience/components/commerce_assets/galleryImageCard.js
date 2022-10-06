'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper');

/**
 * Render logic for the commerce_assets.galleryImageCard component
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Platform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();

    model = context.content;
    model.featuredImage = ImageTransformation.url(context.content.featuredImage, { device: 'mobile' });

    model.regions = PageRenderHelper.getRegionModelRegistry(context.component);

    return new Template('experience/components/commerce_assets/galleryImageCard').render(model).text;
};