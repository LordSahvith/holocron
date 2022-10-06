'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation.js');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');
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

    let imageMobile = content.imageMobile ? ImageTransformation.url(content.imageMobile, { device: 'mobile' }) : null;
    let imageMobile2x = content.imageMobile ? ImageTransformation.url(content.imageMobile, { device: 'mobile2x' }) : null;
    let imageTablet = content.imageTablet ? ImageTransformation.url(content.imageTablet, { device: 'tablet' }) : null;
    let imageTablet2x = content.imageTablet ? ImageTransformation.url(content.imageTablet, { device: 'tablet2x' }) : null;
    let imageDesktop = content.imageDesktop ? ImageTransformation.url(content.imageDesktop, { device: 'desktop' }) : null;
    let imageDesktop2x = content.imageDesktop ? ImageTransformation.url(content.imageDesktop, { device: 'desktop2x' }) : null;

    model.mobileSrc = imageMobile ? imageMobile + ', ' + imageMobile2x + ' 2x' : null;
    model.tabletSrc = imageTablet ? imageTablet + ', ' + imageTablet2x + ' 2x' : null;
    model.desktopSrc = imageDesktop ? imageDesktop + ', ' + imageDesktop2x + ' 2x' : null;
    model.imageDesktop = imageDesktop ? imageDesktop : null;

    // Map margins to Style
    if (content.margins) {
        model.margins = ' pd-content-margins';
    } else {
        model.margins = '';
    }

    // Map Cut Color to Style
    switch (content.cutcolor) {
        case 'white':
            model.cutcolor = ' --white';
            break;
        case 'sand':
            model.cutcolor = ' --sand';
            break;
        case 'forrest':
            model.cutcolor = ' --forrest';
            break;
        case 'sky':
            model.cutcolor = ' --sky';
            break;
        default:
            model.cutcolor = '';
            break;
    }
    
    // Map Cut Shape to Style
    switch (content.cutshape) {
        case 'Cutout 1':
            model.cutshape = 'c1';
            break;
        case 'Cutout 2':
            model.cutshape = 'c2';
            break;
        case 'Cutout 3':
            model.cutshape = 'c3';
            break;
        default:
            model.cutshape = '';
            break;
    }

    // Map Cut Position to Style
    switch (content.cutposition) {
        case 'left':
            model.cutposition = ' --left';
            break;
        case 'right':
            model.cutposition = ' --right';
            break;
        default:
            model.cutposition = '';
            break;
    }

    // container cutout class
    if (model.cutshape != '') {
        model.cutout = ' cutout';
    } else {
        model.cutout = '';
    }

    // Map position to style
    switch (content.hposition) {
        case 'left':
            model.hposition = ' align-items-md-start';
            break;
        case 'center':
            model.hposition = ' align-items-md-center';
            break;
        case 'right':
            model.hposition = ' align-items-md-end';
            break;
        default:
            model.hposition = '';
            break;
    }

    // Set Text Position style class
    switch (content.hposition) {
        case 'left':
            model.textpos = ' text-md-left';
            break;
        case 'center':
            model.textpos = ' text-md-center';
            break;
        case 'right':
            model.textpos = ' text-md-left';
            break;
        default:
            model.textpos = '';
            break;
    }

    // Map position to style
    switch (content.vposition) {
        case 'top':
            model.vposition = ' justify-content-md-start';
            break;
        case 'center':
            model.vposition = ' justify-content-md-center';
            break;
        case 'bottom':
            model.vposition = ' justify-content-md-end';
            break;
        default:
            model.vposition = '';
            break;
    }

    let mvposition = content.mvposition ? content.mvposition : 'bottom';
    // Map mobile position to style
    switch (mvposition) {
        case 'top':
            model.mvposition = ' justify-content-start';
            break;
        case 'center':
            model.mvposition = ' justify-content-center';
            break;
        case 'bottom':
            model.mvposition = ' justify-content-end';
            break;
        default:
            model.mvposition = '';
            break;
    }

    let mhposition = content.mhposition ? content.mhposition : 'center';
    // Map mobile position to style
    switch (mhposition) {
        case 'left':
            model.mhposition = ' align-items-start';
            break;
        case 'center':
            model.mhposition = ' align-items-center';
            break;
        case 'right':
            model.mhposition = ' align-items-end';
            break;
        default:
            model.mhposition = '';
            break;
    }

    // Set Mobile Text Position style class
    switch (mhposition) {
        case 'left':
            model.mtextpos = ' text-left';
            break;
        case 'center':
            model.mtextpos = ' text-center';
            break;
        case 'right':
            model.mtextpos = ' text-right';
            break;
        default:
            model.mtextpos = '';
            break;
    }

    model.linkWrapperUsed = content.linkwrapperurl ? true : false;
    model.linkWrapperUrl = content.linkwrapperurl;
    model.linkWrapperAlt = content.linkwrapperalt;

    model.gaEvent = GAEventsBuilder(
        content.category,
        content.action,
        content.label
    );

    var component = context.component;

    model.regions = PageRenderHelper.getRegionModelRegistry(component);

    return new Template('experience/components/commerce_assets/billboard').render(model).text;
};
