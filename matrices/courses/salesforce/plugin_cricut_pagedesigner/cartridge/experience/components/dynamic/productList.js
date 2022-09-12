'use strict';
/* global request */

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');
var URLUtils = require('dw/web/URLUtils');
var requestToObj = require('*/cartridge/scripts/helpers/requestToObj');
var reportingUrlsHelper = require('*/cartridge/scripts/reportingUrls');
var hooksHelper = require('*/cartridge/scripts/helpers/hooks');
/**
 * Render logic for the product list component
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();

    var component = context.component;
    model.component = component;
    model.regions = PageRenderHelper.getRegionModelRegistry(component);
    var content = context.content;
    model.categoryId = content.category.getID();

    var CatalogMgr = require('dw/catalog/CatalogMgr');
    var ProductSearchModel = require('dw/catalog/ProductSearchModel');
    var searchHelper = require('*/cartridge/scripts/helpers/searchHelpers');
    var ProductSearch = require('*/cartridge/models/search/productSearch');

    var apiProductSearch = new ProductSearchModel();
    var params;
    if (!PageRenderHelper.isInEditMode()) {
        params = requestToObj.customRequestParamsToObj(request);
        params.cgid = model.categoryId;
    } else {
        params = {
            cgid: model.categoryId
        };
    }
    apiProductSearch = searchHelper.setupSearch(apiProductSearch, params, request.httpParameterMap);
    var sortingRule = params.srule ? params.srule  : apiProductSearch.category.defaultSortingRule.ID;
    apiProductSearch.search();

    var productSearch = new ProductSearch(
        apiProductSearch,
        params,
        sortingRule,
        CatalogMgr.getSortingOptions(),
        CatalogMgr.getSiteCatalog().getRoot()
    );

    model.productSearch = productSearch;
    model.apiProductSearch = apiProductSearch;
    model.maxSlots = 4;
    var isEditMode = PageRenderHelper.isInEditMode();
    model.isEditMode = isEditMode;

    // Don't do these for PD preview because it isn't needed and explodes the grid
    if (!isEditMode) {
        // refinements in PD PLP
        model.canonicalUrl = URLUtils.url('Search-Show', 'cgid', params.cgid);
        var refineurl = URLUtils.url('Search-Refinebar');
        var allowedParams = ['q', 'cgid', 'pmin', 'pmax', 'srule', 'pmid'];
        var isRefinedSearch = false;
        var reportingURLs = null;

        Object.keys(params).forEach(function (element) {
            if (allowedParams.indexOf(element) > -1) {
                refineurl.append(element, params[element]);
            }

            if (['pmin', 'pmax'].indexOf(element) > -1) {
                isRefinedSearch = true;
            }

            if (element === 'preferences') {
                var i = 1;
                isRefinedSearch = true;
                Object.keys(params[element]).forEach(function (preference) {
                    refineurl.append('prefn' + i, preference);
                    refineurl.append('prefv' + i, params[element][preference]);
                    i++;
                });
            }
        });

        // GTM in PD PLP
        var analyticsImpressionsConstants = '{}';

        if (productSearch) {
            analyticsImpressionsConstants = hooksHelper(
                'app.models.analyticsData',
                'analyticsImpressionsConstants',
                {
                    productSearch: productSearch
                },
                function() { return '{}'; }
            );
        }

        if (productSearch.searchKeywords !== null && !isRefinedSearch) {
            reportingURLs = reportingUrlsHelper.getProductSearchReportingURLs(productSearch);
        }

        model.refineurl = refineurl;
        model.isRefinedSearch = isRefinedSearch;
        model.reportingURLs = reportingURLs;
        model.analyticsImpressionsConstants = analyticsImpressionsConstants;
    }

    return new Template('experience/components/dynamic/productList/productList.isml').render(model).text;
};
