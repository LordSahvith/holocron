'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper');


/**
 * Render logic for the commerce_assets.galleryTestimonialCard component
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Platform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();

    model.testimonial = context.content.testimonial ? context.content.testimonial : null;

    model.textSizeClass = context.content.textSize === 'Small' ? 'font-title-sm' : 'font-title-lg';
    model.cutColor = context.content.colorAccent.toLowerCase().replace(/[_ .]/g, "-");
    model.cut = context.content.cutStyle.toLowerCase();
    model.hideElement = '';

    let colorArray = ['salmon', 'sky', 'shamrock', 'forest', 'cricut-green'];

    if (model.cutColor === "random") {
        let randomNum = Math.floor(Math.random() * 5);
        model.cutColor = colorArray[randomNum];
    } else {
        switch (model.cutColor) {
            case 'red':
                model.cutColor = colorArray[0];
                break;
            case 'blue':
                model.cutColor = colorArray[1];
                break;
            case 'light-green':
                model.cutColor = colorArray[2];
                break;
            case 'dark-green':
                model.cutColor = colorArray[3];
                break;
            default:
                model.cutColor = colorArray[4];
                break;
        }
    }

    let cutArray = [
        '<svg viewBox="0 0 356 72" fill="none" xmlns="http://www.w3.org/2000/svg" style="touch-action: pan-y;"><path d="M356 71L72 -2V-71H356V71Z" fill="#00237D" style="touch-action: pan-y;"></path></svg>',
        '<svg viewBox="0 0 356 72" fill="none" xmlns="http://www.w3.org/2000/svg" style="touch-action: pan-y;"><path d="M187.385 13.2985C140.2 46.5448 0 66 0 66L0 -66H216.944V-40.8806C216.944 -40.8806 219.656 -9.43888 187.385 13.2985Z" fill="#00237D" style="touch-action: pan-y;"></path></svg>',
        '<svg viewBox="0 0 356 72" fill="none" xmlns="http://www.w3.org/2000/svg" style="touch-action: pan-y;"><path d="M-2.5 72C110.07 -9.71682 294.5 -1.6364 294.5 -1.6364L304 -61.0909L-96 -61.0909L-96 228.545C-96 228.545 -65 117.37 -2.5 72Z" fill="#00237D" style="touch-action: pan-y;"></path></svg>',
        '<svg viewBox="0 0 356 72" fill="none" xmlns="http://www.w3.org/2000/svg" style="touch-action: pan-y;"><ellipse cx="321" cy="-124.378" rx="200" ry="194.595" fill="#00237D" style="touch-action: pan-y;"></ellipse></svg>',
        '<svg viewBox="0 0 356 72" fill="none" xmlns="http://www.w3.org/2000/svg" style="touch-action: pan-y;"><path d="M-17 -64L-11.762 43.021C-11.762 43.021 0.0560417 68.9999 34.4537 69C99.5458 69.0003 95.7067 10.3955 193.316 21.5951C265.738 29.9048 240.882 -64 240.882 -64H-17Z" fill="#FAC3BE" style="touch-action: pan-y;"></path></svg>',
        '<svg viewBox="0 0 356 72" fill="none" xmlns="http://www.w3.org/2000/svg" style="touch-action: pan-y;"><ellipse cx="321" cy="-124.378" rx="200" ry="194.595" fill="#00237D" style="touch-action: pan-y;"></ellipse></svg>'
    ];

    if (model.cut === "random") {
        let randomNum = Math.floor(Math.random() * 6);
        model.cut = cutArray[randomNum];
    } else {
        let index = model.cut - 1;
        model.cut = cutArray[index];
    }

    model.backgroundColor = context.content.backgroundColor === 'White' ? '#fff' : '#f0f0f0';
    model.regions = PageRenderHelper.getRegionModelRegistry(context.component);

    model.tagExists = model.regions.tag.region.size > 0 ? true : false;
    model.testimonialContentExists = model.regions.testimonialContent.region.size > 0 ? true : false;

    return new Template('experience/components/commerce_assets/galleryTestimonialCard').render(model).text;
};
