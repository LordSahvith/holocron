'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var GAEventsBuilder = require('../../utilities/GAEventsBuilder');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper');

/**
 * Render logic for the commerce_assets.horizontalGallery component
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var content = context.content;

    model.colorTheme = 'gallery-' + content.colorTheme;

    var previousLabel = content.label + '-previousArrow';
    model.gaEventPreviousArrow = GAEventsBuilder(
        content.category,
        content.action,
        previousLabel
    );

    var nextLabel = content.label + '-nextArrow';
    model.gaEventNextArrow = GAEventsBuilder(
        content.category,
        content.action,
        nextLabel
    );

    model.regions = PageRenderHelper.getRegionModelRegistry(context.component);

    model.regions.slides.setClassName('gallery-slides-inner');

    return new Template('experience/components/commerce_assets/horizontalGallery').render(model).text;
};
