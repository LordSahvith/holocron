'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var GAEventsBuilder = require('../../utilities/GAEventsBuilder');

/**
 * Render logic for the Modal Button component
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

    model.gaEvent = GAEventsBuilder(
        content.category,
        content.action,
        content.label
    );

    model.buttonColor = model.btncolor !== 'default' ? ' pd-button--' + model.btncolor : '';
    if(content.modalType === 'internal video') {
        model.modalDataURL = ' data-video-url=' + content.modalURL;
    } else {
        model.modalDataURL = ' data-content-url=' + content.modalURL;
    }
    // add a title but default to a generic message for existing content without it
    model.contentTitle = ' data-title=' + (content.contentTitle != "" ? content.contentTitle : "Cricut_site_content");

    return new Template('experience/components/buttons/modal').render(model).text;
};
