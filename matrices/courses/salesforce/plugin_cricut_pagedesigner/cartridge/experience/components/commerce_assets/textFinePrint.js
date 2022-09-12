"use strict";

var Template = require("dw/util/Template");
var HashMap = require("dw/util/HashMap");

/**
 * Render logic for the commerce_assets.textFinePrint
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var content = context.content;

    model.text = content.text;

    switch(content.orderedListStyling) {
        case 'Unstyled':
            model.orderedListStyling = ' list-unstyled';
            break;
        case 'Symbol':
            model.orderedListStyling = ' list-symbols';
            break;
        default:
            model.orderedListStyling = ' list-numbered';
            break;
    }

    switch(content.unorderedListStyling) {
        case 'Unstyled':
            model.unorderedListStyling = ' list-unstyled';
            break;
        case 'Circle':
            model.unorderedListStyling = ' list-circle';
            break;
        default:
            model.unorderedListStyling = ' list-bullet';
            break;
    }

    return new Template("experience/components/commerce_assets/textFinePrint").render(
        model
    ).text;
};
