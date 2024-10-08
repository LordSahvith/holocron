'use strict';

var ISML = require('dw/template/ISML');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for the storepage.
 *
 * @param {dw.experience.PageScriptContext} context The page script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();

    var page = context.page;
    model.page = page;
    model.content = context.content;

    // automatically register configured regions
    model.regions = PageRenderHelper.getRegionModelRegistry(page);

    if (PageRenderHelper.isInEditMode()) {
        var HookManager = require('dw/system/HookMgr');
        HookManager.callHook('app.experience.editmode', 'editmode');
        model.resetEditPDMode = true;
    }

    model.CurrentPageMetaData = PageRenderHelper.getPageMetaData(page);

    // render the page
    // force ISML rendering to work around hook render order
    // old: return new Template('experience/pages/pd-homePage').render(model).text;
    ISML.renderTemplate('experience/pages/pd-emptyPage', model);
    return '';
};
