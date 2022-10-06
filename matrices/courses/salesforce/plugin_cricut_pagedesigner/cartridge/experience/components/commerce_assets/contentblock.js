'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
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

    model.contenttype = content.contenttype;
    if (content.imageMobile) {
        model.imageMobile = ImageTransformation.url(content.imageMobile, { device: 'mobile' });
    } else {
        model.imageMobile = false;
    }
    if (content.imageTablet) {
        model.imageTablet = ImageTransformation.url(content.imageTablet, { device: 'tablet' });
    } else {
        model.imageTablet = false;
    }
    if (content.imageDesktop) {
        model.imageDesktop = ImageTransformation.url(content.imageDesktop, { device: 'desktop' });
    } else {
        model.imageDesktop = false;
    }
    model.backgroundcolor = content.backgroundcolor;
    model.heading = content.heading;
    model.subHeading = content.subheading;
    model.textposition = content.textposition;
    model.textcolor = content.textcolor;
    if (content.cta) {
        model.cta = URLUtils.url('Search-Show', 'cgid', content.cta.getID()).toString();
    } else {
        model.cta = false;
    }
    model.ctatext = content.ctatext;
    model.ctastyle = content.ctastyle;
    model.vposition = content.vposition;

    return new Template('experience/components/commerce_assets/contentBlock').render(model).text;
};
