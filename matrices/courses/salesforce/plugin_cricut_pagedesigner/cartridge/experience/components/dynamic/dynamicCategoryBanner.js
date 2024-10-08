'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

/**
 * Render logic for dynamicBanner component.
 * @param {dw.experience.ComponentScriptContext} context The component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var content = context.content;

    if (content.product && !(content.heading && content.image)) {
        var product = content.product;
        content.category = product.variant
            ? product.masterProduct.primaryCategory
            : product.primaryCategory;
        if (!content.category) {
            content.category = product.variant
                ? product.masterProduct.classificationCategory
                : product.classificationCategory;
        }
    }
    if (!content.category && !(content.heading && content.image)) {
        // this will not work, we are missing data. We throw an error to cause a 'placeholder' and a console error in PD.
        var Resource = require('dw/web/Resource');
        throw new Error(Resource.msg('pd.categoryBanner.error', 'pageDesigner', null));
    }
    if (content.heading) {
        model.heading = content.heading;
    } else {
        model.heading = content.category ? content.category.getDisplayName() : '';
    }

    model.categoryId = content.category.ID;

    return new Template('experience/components/commerce_assets/categoryBanner').render(model).text;
};
