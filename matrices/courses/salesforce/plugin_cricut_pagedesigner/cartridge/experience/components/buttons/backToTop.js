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

    model.btncolor = content.btncolor;
    model.scrollTo = '';
    model.dataTarget = '';

    if (content.scrollTo && content.scrollTo !== '') {
        model.scrollTo = ' data-scroll="' + content.scrollTo + '"';
    }

    if (content.dataTarget && content.dataTarget !== '') {
        model.dataTarget = ' data-target="' + content.dataTarget + '"';
    }

    model.gaEvent = GAEventsBuilder(
        content.category,
        content.action,
        content.label
    );

    model.buttonColor = model.btncolor !== 'default' ? ' pd-backToTop--' + model.btncolor : '';
    model.buttonScrollTo = model.scrollTo ? model.scrollTo : '';
    model.buttonDataTarget = model.dataTarget ? model.dataTarget : '';

    return new Template('experience/components/buttons/backToTop').render(model).text;
};
