'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for the commerce_layouts.containerAdjustableWidth component
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var content = context.content;

    let maxWidth = content.containerMaxWidth ? content.containerMaxWidth : "Large (1440px)";
    // Map max-width to class
    switch (maxWidth) {
        case 'Full Screen':
            model.containerMaxWidth = 'container-fluid';
            break;
        case 'XXL (2048px)':
            model.containerMaxWidth = 'pd-containerMax-xxl';
            break;
        case 'XLarge (1660px)':
            model.containerMaxWidth = 'pd-containerMax-xl';
            break;
        case 'Large (1440px)':
            model.containerMaxWidth = 'pd-containerMax-lg';
            break;
        case 'Medium (1024px)':
            model.containerMaxWidth = 'pd-containerMax-md';
            break;
        case 'Small (640px)':
            model.containerMaxWidth = 'pd-containerMax-sm';
            break;
        default:
            model.containerMaxWidth = 'pd-containerMax-lg';
            break;
    }

    let mobileAbove = content.mobileAbove ? content.mobileAbove : "60";
    // Map Mobile Margin Top to Class
    switch (mobileAbove) {
        case '0':
            model.mobileAbove = ' mt-0';
            break;
        case '30':
            model.mobileAbove = ' mt-9';
            break;
        case '60':
            model.mobileAbove = ' mt-11';
            break;
        case '120':
            model.mobileAbove = ' pd-mt-12rem';
            break;
        default:
            model.mobileAbove = ' mt-11';
            break;
    }

    let tabletAbove = content.tabletAbove ? content.tabletAbove : "120";
    // Map Tablet Margin Top to Class
    if(tabletAbove === mobileAbove) {
        model.tabletAbove = '';
    } else {
        switch (tabletAbove) {
            case '0':
                model.tabletAbove = ' mt-md-0';
                break;
            case '30':
                model.tabletAbove = ' mt-md-9';
                break;
            case '60':
                model.tabletAbove = ' mt-md-11';
                break;
            case '120':
                model.tabletAbove = ' pd-mt-md-12rem';
                break;
            default:
                model.tabletAbove = ' pd-mt-md-12rem';
                break;
        }
    }

    let desktopAbove = content.desktopAbove ? content.desktopAbove : "120";
    // Map desktop Margin Top to Class
    if(desktopAbove === tabletAbove) {
        model.desktopAbove = '';
    } else {
        switch (desktopAbove) {
            case '0':
                model.desktopAbove = ' mt-lg-0';
                break;
            case '30':
                model.desktopAbove = ' mt-lg-9';
                break;
            case '60':
                model.desktopAbove = ' mt-lg-11';
                break;
            case '120':
                model.desktopAbove = ' pd-mt-lg-12rem';
                break;
            default:
                model.desktopAbove = ' pd-mt-lg-12rem';
                break;
        }
    }

    let mobileBelow = content.mobileBelow ? content.mobileBelow : "60";
    // Map Mobile Margin Bottom to Class
    switch (mobileBelow) {
        case '0':
            model.mobileBelow = ' mb-0';
            break;
        case '30':
            model.mobileBelow = ' mb-9';
            break;
        case '60':
            model.mobileBelow = ' mb-11';
            break;
        case '120':
            model.mobileBelow = ' pd-mb-12rem';
            break;
        default:
            model.mobileBelow = ' mb-11';
            break;
    }

    let tabletBelow = content.tabletBelow ? content.tabletBelow : "120";
    // Map Tablet Margin Bottom to Class
    if(tabletBelow === mobileBelow) {
        model.tabletBelow = '';
    } else {
        switch (tabletBelow) {
            case '0':
                model.tabletBelow = ' mb-md-0';
                break;
            case '30':
                model.tabletBelow = ' mb-md-9';
                break;
            case '60':
                model.tabletBelow = ' mb-md-11';
                break;
            case '120':
                model.tabletBelow = ' pd-mb-md-12rem';
                break;
            default:
                model.tabletBelow = ' pd-mb-md-12rem';
                break;
        }
    }

    let desktopBelow = content.desktopBelow ? content.desktopBelow : "120";
    // Map desktop Margin Bottom to Class
    if(desktopBelow === tabletBelow) {
        model.desktopBelow = '';
    } else {
        switch (desktopBelow) {
            case '0':
                model.desktopBelow = ' mb-lg-0';
                break;
            case '30':
                model.desktopBelow = ' mb-lg-9';
                break;
            case '60':
                model.desktopBelow = ' mb-lg-11';
                break;
            case '120':
                model.desktopBelow = ' pd-mb-lg-12rem';
                break;
            default:
                model.desktopBelow = ' pd-mb-lg-12rem';
                break;
        }
    }

    let mobileLeft = content.mobileLeft ? content.mobileLeft : "30";
    // Map Mobile Padding Left to Class
    switch (mobileLeft) {
        case '0':
            model.mobileLeft = ' pl-0';
            break;
        case '30':
            model.mobileLeft = ' pl-9';
            break;
        case '40':
            model.mobileLeft = ' pl-10';
            break;
        case '70':
            model.mobileLeft = ' pl-12';
            break;
        default:
            model.mobileLeft = ' pl-9';
            break;
    }

    let tabletLeft = content.tabletLeft ? content.tabletLeft : "40";
    // Map Tablet Padding Left to Class
    if(tabletLeft === mobileLeft) {
        model.tabletLeft = '';
    } else {
        switch (tabletLeft) {
            case '0':
                model.tabletLeft = ' pl-md-0';
                break;
            case '30':
                model.tabletLeft = ' pl-md-9';
                break;
            case '40':
                model.tabletLeft = ' pl-md-10';
                break;
            case '70':
                model.tabletLeft = ' pl-md-12';
                break;
            default:
                model.tabletLeft = ' pl-md-10';
                break;
        }
    }

    let desktopLeft = content.desktopLeft ? content.desktopLeft : "70";
    // Map desktop Padding Left to Class
    if(desktopLeft === tabletLeft) {
        model.desktopLeft = '';
    } else {
        switch (desktopLeft) {
            case '0':
                model.desktopLeft = ' pl-lg-0';
                break;
            case '30':
                model.desktopLeft = ' pl-lg-9';
                break;
            case '40':
                model.desktopLeft = ' pl-lg-10';
                break;
            case '70':
                model.desktopLeft = ' pl-lg-12';
                break;
            default:
                model.desktopLeft = ' pl-lg-12';
                break;
        }
    }

    let mobileRight = content.mobileRight ? content.mobileRight : "30";
    // Map Mobile Padding Right to Class
    switch (mobileRight) {
        case '0':
            model.mobileRight = ' pr-0';
            break;
        case '30':
            model.mobileRight = ' pr-9';
            break;
        case '40':
            model.mobileRight = ' pr-10';
            break;
        case '70':
            model.mobileRight = ' pr-12';
            break;
        default:
            model.mobileRight = ' pr-9';
            break;
    }

    let tabletRight = content.tabletRight ? content.tabletRight : "40";
    // Map Tablet Padding Right to Class
    if(tabletRight === mobileRight) {
        model.tabletRight = '';
    } else {
        switch (tabletRight) {
            case '0':
                model.tabletRight = ' pr-md-0';
                break;
            case '30':
                model.tabletRight = ' pr-md-9';
                break;
            case '40':
                model.tabletRight = ' pr-md-10';
                break;
            case '70':
                model.tabletRight = ' pr-md-12rem';
                break;
            default:
                model.tabletRight = ' pr-md-10';
                break;
        }
    }

    let desktopRight = content.desktopRight ? content.desktopRight : "70";
    // Map desktop Padding Right to Class
    if(desktopRight === tabletRight) {
        model.desktopRight = '';
    } else {
        switch (desktopRight) {
            case '0':
                model.desktopRight = ' pr-lg-0';
                break;
            case '30':
                model.desktopRight = ' pr-lg-9';
                break;
            case '40':
                model.desktopRight = ' pr-lg-10';
                break;
            case '70':
                model.desktopRight = ' pr-lg-12';
                break;
            default:
                model.desktopRight = ' pr-lg-12';
                break;
        }
    }

    var component = context.component;

    model.regions = PageRenderHelper.getRegionModelRegistry(component);

    return new Template('experience/components/commerce_layouts/containerAdjustableWidth').render(model).text;
};