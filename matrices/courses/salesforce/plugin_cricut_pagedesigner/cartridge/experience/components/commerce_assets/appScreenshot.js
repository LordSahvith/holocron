'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation');

/**
 * Render logic for the commece_assets.appScreenshot component
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var content = context.content;

    model.heading = content.heading;
    model.bodyText = content.bodyText;
    model.device = content.device === 'Tablet' ? 'tablet' : 'laptop';
    model.deviceSrc = URLUtils.staticURL('images/appScreenshot/' + model.device + '.png');

    var outerLeftImg = content.outerLeftImg ? ImageTransformation.url(content.outerLeftImg, { device: 'mobile' }) : null;
    var outerLeftImg2x = content.outerLeftImg ? ImageTransformation.url(content.outerLeftImg, { device: 'mobile2x' }) : null;
    var innerLeftImg = content.innerLeftImg ? ImageTransformation.url(content.innerLeftImg, { device: 'mobile' }) : null;
    var innerLeftImg2x = content.innerLeftImg ? ImageTransformation.url(content.innerLeftImg, { device: 'mobile2x' }) : null;
    var mainImg = content.mainImg ? ImageTransformation.url(content.mainImg, { device: 'mobile' }) : null;
    var mainImg2x = content.mainImg ? ImageTransformation.url(content.mainImg, { device: 'mobile2x' }) : null;
    var innerRightImg = content.innerRightImg ? ImageTransformation.url(content.innerRightImg, { device: 'mobile' }) : null;
    var innerRightImg2x = content.innerRightImg ? ImageTransformation.url(content.innerRightImg, { device: 'mobile2x' }) : null;
    var outerRightImg = content.outerRightImg ? ImageTransformation.url(content.outerRightImg, { device: 'mobile' }) : null;
    var outerRightImg2x = content.outerRightImg ? ImageTransformation.url(content.outerRightImg, { device: 'mobile2x' }) : null;

    model.outerLeftImgSrc = outerLeftImg && outerLeftImg !== outerLeftImg2x ? outerLeftImg + ', ' + outerLeftImg2x + ' 2x' : outerLeftImg;
    model.outerLeftImgDefault = outerLeftImg ? outerLeftImg : null;
    model.innerLeftImgSrc = innerLeftImg && innerLeftImg !== innerLeftImg2x ? innerLeftImg + ', ' + innerLeftImg2x + ' 2x' : innerLeftImg;
    model.innerLeftImgDefault = innerLeftImg ? innerLeftImg : null;
    model.mainImgSrc = mainImg && mainImg !== mainImg2x ? mainImg + ', ' + mainImg2x + ' 2x' : mainImg;
    model.mainImgDefault = mainImg ? mainImg : null;
    model.innerRightImgSrc = innerRightImg && innerRightImg !== innerRightImg2x ? innerRightImg + ', ' + innerRightImg2x + ' 2x' : innerRightImg;
    model.innerRightImgDefault = innerRightImg ? innerRightImg : null;
    model.outerRightImgSrc = outerRightImg && outerRightImg !== outerRightImg2x ? outerRightImg + ', ' + outerRightImg2x + ' 2x' : outerRightImg;
    model.outerRightImgDefault = outerRightImg ? outerRightImg : null;

    model.finePrintText = content.finePrintText ? '<div class="app-info p-tag">' + content.finePrintText + '</div>' : '';

    return new Template('experience/components/commerce_assets/appScreenshot').render(model).text;
};
