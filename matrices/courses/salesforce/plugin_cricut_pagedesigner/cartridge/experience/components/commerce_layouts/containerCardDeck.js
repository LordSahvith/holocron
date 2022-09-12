'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for the commerce_layouts.containerCardDeck component
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

    let smCols = content.smCols ? content.smCols : "1";
    // Map Mobile Columns to class
    switch (smCols) {
        case '1':
            model.smColsClass = ' row-cols-1';
            break;
        case '2':
            model.smColsClass = ' row-cols-2';
            break;
        default:
            model.smColsClass = ' row-cols-1';
            break;
    }

    let mdCols = content.mdCols ? content.mdCols : "2";
    if( mdCols === smCols) {
        model.mdColsClass = '';
    } else {
        // Map Tablet Columns to class
        switch (mdCols) {
            case '1':
                model.mdColsClass = ' row-cols-sm-1';
                break;
            case '2':
                model.mdColsClass = ' row-cols-sm-2';
                break;
            case '3':
                model.mdColsClass = ' row-cols-sm-3';
                break;
            default:
                model.mdColsClass = ' row-cols-sm-2';
                break;
        }
    }

    let lgCols = content.lgCols ? content.lgCols : "3";
    if( lgCols === mdCols) {
        model.lgColsClass = '';
    } else {
        // Map Desktop Columns to class
        switch (lgCols) {
            case '1':
                model.lgColsClass = ' row-cols-md-1';
                break;
            case '2':
                model.lgColsClass = ' row-cols-md-2';
                break;
            case '3':
                model.lgColsClass = ' row-cols-md-3';
                break;
            case '4':
                model.lgColsClass = ' row-cols-md-4';
                break;
            default:
                model.lgColsClass = ' row-cols-md-3';
                break;
        }
    }

    var component = context.component;
    model.regions = PageRenderHelper.getRegionModelRegistry(component);

    return new Template('experience/components/commerce_layouts/containerCardDeck').render(model).text;
};
