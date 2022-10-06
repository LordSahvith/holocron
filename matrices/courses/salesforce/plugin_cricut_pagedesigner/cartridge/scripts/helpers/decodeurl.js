'use strict';

var URLUtils = require('dw/web/URLUtils');

/**
 * validates that the product line items exist, are online, and have available inventory.
 * @param {Object} viewData - The current user's basket
 * @returns {Object} parsed url
 */
function getStatic(viewData) {
    var q = viewData.queryString;
    var string = q.split('=');
    var urlq = decodeURIComponent(string[1]);
    var staticUrl = URLUtils.staticURL(urlq);

    return staticUrl;
}

/**
 * validates that the product line items exist, are online, and have available inventory.
 * @param {Object} viewData - The current user's basket
 * @returns {Object} parsed url
 */
function getPath(viewData) {
    var q = viewData.queryString;
    var string = q.split('=');
    var path = decodeURIComponent(string[1]);

    return path;
}

/**
 * validates that the product line items exist, are online, and have available inventory.
 * @param {Object} viewData - The current user's basket
 * @returns {Object} parsed query as object
 */
function getQuery(viewData) {
    var q = viewData.queryString;
    var string = q.split('=');
    var query = decodeURIComponent(string[1]);

    var parseQuery = query.split("&");

    var object = {};
    
    for (var i = 0; i < parseQuery.length; i++) {

        let pair = parseQuery[i].split('=');
        let key = decodeURIComponent(pair[0]);
        if (key.length == 0) continue;
        let value = pair[1];

        if (object[key] == undefined) object[key] = value;
        else if (object[key] instanceof Array) object[key].push(value);
        else object[key] = [object[key],value];

    }

    return object;
}

module.exports = {
    getStatic: getStatic,
    getPath: getPath,
    getQuery: getQuery
};
