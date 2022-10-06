'use strict';

var Template = require("dw/util/Template");
var HashMap = require("dw/util/HashMap");
var GAEventsBuilder = require("../../utilities/GAEventsBuilder");

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

    model.type = content.type;
    model.btncolor = content.btncolor;
    model.text = content.text;
    model.url = content.url;
    model.targetBlank = content.targetBlank ? "_blank" : "_self";

    model.gaEvent = GAEventsBuilder(
        content.category,
        content.action,
        content.label
    );

    model.buttonType = model.type !== 'primary' ? ' pd-button--' + model.type : '';
    model.buttonColor = model.btncolor !== 'default' ? ' pd-button--' + model.btncolor : '';
    model.linkAriaLabel = content.linkAriaLabel ? ` aria-label="` + content.linkAriaLabel + `"` : '';

    return new Template("experience/components/buttons/links").render(model).text;
};
