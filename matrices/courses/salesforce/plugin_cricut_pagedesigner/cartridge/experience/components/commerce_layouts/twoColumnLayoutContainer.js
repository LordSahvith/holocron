'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for the commerce_layouts.twoColumnLayoutContainer component
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();

    var component = context.component;
    var content = context.content;
    model.regions = PageRenderHelper.getRegionModelRegistry(component);
    model.width = content.leftWidth + 'x' + content.rightWidth;
    model.reversedMobile = content.reversedMobile ? ' reversed-sm-only' : '';

    return new Template('experience/components/commerce_layouts/twoColumnLayoutContainer').render(model).text;
};
