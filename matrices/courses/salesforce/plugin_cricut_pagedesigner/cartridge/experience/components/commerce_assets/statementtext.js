'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for the storefront.MainBanner component
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var content = context.content;

    // Map position to style
    switch (content.hposition) {
        case 'left':
            model.hposition = ' align-items-start';
            break;
        case 'center':
            model.hposition = ' align-items-center';
            break;
        case 'right':
            model.hposition = ' align-items-end';
            break;
        default:
            model.hposition = '';
            break;
    }
    
    // Set Text Position style class
    switch (content.hposition) {
        case 'left':
            model.textpos = ' text-left';
            break;
        case 'center':
            model.textpos = ' text-center';
            break;
        case 'right':
            model.textpos = ' text-right';
            break;
        default:
            model.textpos = '';
            break;
    }

    switch (content.vposition) {
        case 'top':
            model.vposition = ' justify-content-start';
            break;
        case 'center':
            model.vposition = ' justify-content-center';
            break;
        case 'bottom':
            model.vposition = ' justify-content-end';
            break;
        default:
            model.vposition = '';
            break;
    }
    
    model.containerWidth = content.containerWidth == "narrow" ? 'w-md-33' : '';

    var component = context.component;

    model.regions = PageRenderHelper.getRegionModelRegistry(component);

    return new Template('experience/components/commerce_assets/statementtext').render(model).text;
};
