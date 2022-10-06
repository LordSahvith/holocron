'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');

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

    if (content.cta) {
        model.cta = URLUtils.url('Search-Show', 'cgid', content.cta.getID()).toString();
    } else {
        model.cta = false;
    }
    model.ctatext = content.ctatext;
    model.ctastyle = content.ctastyle;

    return new Template('experience/components/commerce_assets/cta').render(model).text;
};
