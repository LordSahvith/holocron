'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');
var GAEventsBuilder = require("*/cartridge/experience/utilities/GAEventsBuilder");

/**
 * Render logic for the storefront editorial gallery container
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var content = context.content;
    var component = context.component;

    model.gaEvent = GAEventsBuilder(
        content.category,
        content.action,
        content.label
    );

    model.regions = PageRenderHelper.getRegionModelRegistry(component);

    return new Template('experience/components/commerce_layouts/editorialgallerycontainer').render(model).text;
};
