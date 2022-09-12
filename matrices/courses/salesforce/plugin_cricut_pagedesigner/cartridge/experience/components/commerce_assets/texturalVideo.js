'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation.js');
var GAEventsBuilder = require('../../utilities/GAEventsBuilder');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for the Textural Video Component
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var content = context.content;

    model.videoSrcMobile = content.videoSrcMobile ? ' data-videomobile=' + content.videoSrcMobile : '';
    model.videoSrc = content.videoSrc ? ' data-videodesktop=' + content.videoSrc : '';

    model.videoPoster = '';

    if (content.desktopImage && content.desktopImage !== '') {
        let videoPoster = ImageTransformation.url(content.desktopImage, {
            device: 'desktop',
        });
        model.videoPoster = ' poster=' + videoPoster;
    }

    model.videoId = '';

    if (content.videoId && content.videoId !== '') {
        model.videoId = ' id=' + content.videoId;
    }

    model.gaEvent = GAEventsBuilder(
        content.category,
        content.action,
        content.label
    );

    let imageMobile = content.mobileImage ? ImageTransformation.url(content.mobileImage, { device: 'mobile' }) : null;
    let imageMobile2x = content.mobileImage ? ImageTransformation.url(content.mobileImage, { device: 'mobile2x' }) : null;
    let imageDesktop = content.desktopImage ? ImageTransformation.url(content.desktopImage, { device: 'desktop' }) : null;
    let imageDesktop2x = content.desktopImage ? ImageTransformation.url(content.desktopImage, { device: 'desktop2x' }) : null;

    model.mobileSrc = imageMobile ? imageMobile + ', ' + imageMobile2x + ' 2x' : null;
    model.desktopSrc = imageDesktop ? imageDesktop + ', ' + imageDesktop2x + ' 2x' : null;
    model.imageDesktop = imageDesktop ? imageDesktop : null;

    model.imageOnly = content.texturalImageOnly;

    var component = context.component;
    model.regions = PageRenderHelper.getRegionModelRegistry(component);

    return new Template('experience/components/commerce_assets/texturalVideo').render(model).text;
};
