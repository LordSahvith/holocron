'use strict';

/**
 * Script file for rendering an pd_assets.PDPlusHtmlMarkup component
 */

/* Initialize constants */
var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');


/**
 * Render logic for PDPlusHtmlMarkup component.
 * @param {dw.experience.ComponentScriptContext} context The component script context object.
 * @returns {string} The template to be displayed
 */

module.exports.render = function (context) {
    var content = context.content;
    var model = new HashMap();

    model.placeHTML = content.placeHTML;

    if (content.bgColor) {
        model.styleBGColor = 'style="background-color: ' + content.bgColor.value + '; "';
    }

    if (content.txtColor) {
        model.styleTxtColor = 'style="color: ' + content.txtColor.value + '; "';
    }

    model.backgroundPatterns = content.backgroundPatterns;

    model.txtAlignment = content.txtAlignment;

    model.txtWrapping = content.txtWrapping;

    model.boxPosition = content.boxPosition;

    model.btnClassName = content.btnClassName;

    model.isLinkActive = content.isLinkActive;

    if (content.isLinkActive === true) {
        model.btnURL = content.btnURL ? content.btnURL : '#';
    } else {
        model.btnURL = '#';
    }

    model.btnText = content.btnText;
    model.btnExternal = content.btnExternal;

    return new Template('experience/components/pd_assets/PDPlusHtmlMarkup').render(model).text;
};
