/* globals dw */
'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper');
var PageMgr = require('dw/experience/PageMgr');

/**
 * Render logic for the Sticky Bar Component
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var content = context.content;
    let component = context.component;

    model.title = content.stickyBarTitle;

    // center buttons region
    let buttons = component.getRegion('buttons');
    let buttonsRegionSettings = new dw.experience.RegionRenderSettings();
    buttonsRegionSettings.setTagName("ul");
    let buttonComponentStyling = new dw.experience.ComponentRenderSettings();
    buttonComponentStyling.setTagName("li");
    buttonsRegionSettings.setDefaultComponentRenderSettings(buttonComponentStyling);
    model.buttonsRegionSettings = buttonsRegionSettings;
    model.buttonsRegion = PageMgr.renderRegion(buttons, buttonsRegionSettings);

    model.regions = PageRenderHelper.getRegionModelRegistry(component);
    return new Template('experience/components/commerce_assets/stickyBar').render(model).text;
};
