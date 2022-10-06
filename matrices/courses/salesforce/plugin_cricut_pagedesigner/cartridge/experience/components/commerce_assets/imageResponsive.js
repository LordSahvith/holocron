'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation.js');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper');
/**
 * Render logic for the commerce_assets.imageResponsive component
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var content = context.content;
    var component = context.component;

    let imageMobile;
    let imageMobile2x;
    let imageTablet;
    let imageTablet2x;
    let imageDesktop;
    let imageDesktop2x;

    //Assign required mobile image.
    imageMobile = content.imageMobile ? ImageTransformation.url(content.imageMobile, { device: 'mobile' }) : null;
    imageMobile2x = content.imageMobile ? ImageTransformation.url(content.imageMobile, { device: 'mobile2x' }) : null;

    //Assign Tablet image using mobile version if no tablet image is assigned.
    if(!content.imageTablet) {
        imageTablet = content.imageMobile ? ImageTransformation.url(content.imageMobile, { device: 'tablet' }) : null;
        imageTablet2x = content.imageMobile ? ImageTransformation.url(content.imageMobile, { device: 'tablet2x' }) : null;
    }
    else {
        imageTablet = content.imageTablet ? ImageTransformation.url(content.imageTablet, { device: 'tablet' }) : null;
        imageTablet2x = content.imageTablet ? ImageTransformation.url(content.imageTablet, { device: 'tablet2x' }) : null;
    }

    //Assign Desktop image using mobile version if no tablet or desktop image is assigned, and using the tablet image if no Desktop image is assigned.
    if(!content.imageDesktop) {
        if(!content.imageTablet) {
            imageDesktop = content.imageMobile ? ImageTransformation.url(content.imageMobile, { device: 'desktop' }) : null;
            imageDesktop2x = content.imageMobile ? ImageTransformation.url(content.imageMobile, { device: 'desktop2x' }) : null;
        } else {
            imageDesktop = content.imageTablet ? ImageTransformation.url(content.imageTablet, { device: 'desktop' }) : null;
            imageDesktop2x = content.imageTablet ? ImageTransformation.url(content.imageTablet, { device: 'desktop2x' }) : null;
        }
    } else {
        imageDesktop = content.imageDesktop ? ImageTransformation.url(content.imageDesktop, { device: 'desktop' }) : null;
        imageDesktop2x = content.imageDesktop ? ImageTransformation.url(content.imageDesktop, { device: 'desktop2x' }) : null;
    }

    model.mobileSrc = imageMobile ? imageMobile + ', ' + imageMobile2x + ' 2x' : null;
    model.tabletSrc = imageTablet ? imageTablet + ', ' + imageTablet2x + ' 2x' : null;
    model.desktopSrc = imageDesktop ? imageDesktop + ', ' + imageDesktop2x + ' 2x' : null;
    model.imageDesktop = imageDesktop ? imageDesktop : null;

    model.imageAlt = content.imageAlt;
    model.imageLazy = content.lazyLoad ? ' loading="lazy"' : '';

    switch (content.modalPosition) {
        case "None":
            model.modalPosition = 'modal-position-none';
            break;
        case "Center":
            model.modalPosition = 'modal-position-center';
            break;
        case "Bottom Left":
            model.modalPosition = 'modal-position-left';
            break;
        case "Bottom Right":
            model.modalPosition = 'modal-position-right';
            break;
        default:
            break;
    }
    model.regions = PageRenderHelper.getRegionModelRegistry(component);
    return new Template('experience/components/commerce_assets/imageResponsive').render(model).text;
};
