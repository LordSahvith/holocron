'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper');
var GAEventsBuilder = require("*/cartridge/experience/utilities/GAEventsBuilder");

/**
 * Render logic for the commerce_assets.projectGallery component
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var content = context.content;

    model.headline = content.headline;

    var prevArrow = content.label + "-PrevArrow";
    model.gaEventPrevArrow = GAEventsBuilder(
        content.category,
        content.action,
        prevArrow
    );

    model.prevArrow = prevArrow;

    var nextArrow = content.label + '-NextArrow';
    model.gaEventNextArrow = GAEventsBuilder(
        content.category,
        content.action,
        nextArrow
    );

    var component = context.component;

    model.regions = PageRenderHelper.getRegionModelRegistry(component);

    return new Template('experience/components/commerce_assets/projectGallery').render(model).text;
};
