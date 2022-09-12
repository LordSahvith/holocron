'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var GAEventsBuilder = require('../../utilities/GAEventsBuilder');

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

    model.text = content.bannerText;
    model.linkText = content.bannerLinkText;
    model.url = content.url;

    model.gaEvent = GAEventsBuilder(
        content.category,
        content.action,
        content.label
    );

    model.bannerColor = ' hh-promo-banner--' + content.bannerColor;

    return new Template("experience/components/banners/promoBanner").render(model).text;
};
