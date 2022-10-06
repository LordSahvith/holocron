'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation.js');

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

    if (content.img) {
        model.imgSrc = ImageTransformation.url(content.img, { device: 'mobile' });
    } else {
        switch (content.swatch) {
            case "Green 2":
                model.swatch = 'images/avatars/green-2.svg';
                break;
            case "Corn and Orchid":
                model.swatch = 'images/avatars/corn-orchid.svg';
                break;
            case "Salmon and Indigo":
                model.swatch = 'images/avatars/salmon-indigo.svg';
                break;
            case "Indigo and Sky":
                model.swatch = 'images/avatars/indigo-sky.svg';
                break;
            default: //Green 1
                model.swatch = "images/avatars/green-1.svg";
                break;
        }
    }

    model.imgAlt = content.imgAlt;

    return new Template('experience/components/commerce_assets/avatar').render(model).text;
};
