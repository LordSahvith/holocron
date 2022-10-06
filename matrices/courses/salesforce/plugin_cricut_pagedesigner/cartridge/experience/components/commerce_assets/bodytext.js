"use strict";

var Template = require("dw/util/Template");
var HashMap = require("dw/util/HashMap");

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

    model.content = content.content;
    model.texttype = content.texttype;
    model.textcolor = content.textcolor;
    model.linkcolor = content.linkcolor;

    switch (content.fontsize) {
        case "small":
            model.fontsize = "font-size-sm";
            break;
        case "medium":
            model.fontsize = "font-size-md";
            break;
        case "large":
            model.fontsize = "font-size-lg";
            break;
        case "x-large":
            model.fontsize = "font-size-xl";
            break;
        case "h1":
            model.fontsize = "font-size-h1";
            break;
        case "h2":
            model.fontsize = "font-size-h2";
            break;
        case "h3":
            model.fontsize = "font-size-h3";
            break;
        case "h4":
            model.fontsize = "font-size-h4";
            break;
        case "h5":
            model.fontsize = "font-size-h5";
            break;
        default:
            model.fontsize = "";
            break;
    }

    switch (content.margintop) {
        case "0px":
            model.margintop = "pd-spacer-0";
            break;
        case "4px":
            model.margintop = "pd-spacer-1";
            break;
        case "8px":
            model.margintop = "pd-spacer-2";
            break;
        case "10px":
            model.margintop = "pd-spacer";
            break;
        case "12px":
            model.margintop = "pd-spacer-3";
            break;
        case "15px":
            model.margintop = "pd-spacer-4";
            break;
        case "16px":
            model.margintop = "pd-spacer-5";
            break;
        case "18px":
            model.margintop = "pd-spacer-6";
            break;
        case "20px":
            model.margintop = "pd-spacer-7";
            break;
        case "24px":
            model.margintop = "pd-spacer-8";
            break;
        case "30px":
            model.margintop = "pd-spacer-9";
            break;
        case "48px":
            model.margintop = "pd-spacer-10";
            break;
        case "64px":
            model.margintop = "pd-spacer-11";
            break;
        case "70px":
            model.margintop = "pd-spacer-12";
            break;
        default:
            model.margintop = "";
            break;
    }

    switch (content.marginbottom) {
        case "0px":
            model.marginbottom = "pd-spacer-0";
            break;
        case "4px":
            model.marginbottom = "pd-spacer-1";
            break;
        case "8px":
            model.marginbottom = "pd-spacer-2";
            break;
        case "10px":
            model.marginbottom = "pd-spacer";
            break;
        case "12px":
            model.marginbottom = "pd-spacer-3";
            break;
        case "15px":
            model.marginbottom = "pd-spacer-4";
            break;
        case "16px":
            model.marginbottom = "pd-spacer-5";
            break;
        case "18px":
            model.marginbottom = "pd-spacer-6";
            break;
        case "20px":
            model.marginbottom = "pd-spacer-7";
            break;
        case "24px":
            model.marginbottom = "pd-spacer-8";
            break;
        case "30px":
            model.marginbottom = "pd-spacer-9";
            break;
        case "48px":
            model.marginbottom = "pd-spacer-10";
            break;
        case "64px":
            model.marginbottom = "pd-spacer-11";
            break;
        case "70px":
            model.marginbottom = "pd-spacer-12";
            break;
        default:
            model.marginbottom = "";
            break;
    }

    return new Template(
        "experience/components/commerce_assets/bodytext"
    ).render(model).text;
};
