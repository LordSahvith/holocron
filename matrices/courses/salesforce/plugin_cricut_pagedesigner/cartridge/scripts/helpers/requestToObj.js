'use strict';

/**
 * Code to retrieve any custom query string params and store them in an object
 * @param {Object} req - The request to parse
 * @returns {Object} An object with key value pairs for the query string params
 */
function customRequestParamsToObj(req) {
    if(req.httpParameterMap.params && !empty(req.httpParameterMap.params)) {
        let requestParams = JSON.parse(req.httpParameterMap.params);

        if(requestParams.custom && !empty(requestParams.custom)) {
            let customParams = JSON.parse(requestParams.custom);

            if(customParams.queryString && !empty(customParams.queryString)) {
                let params = JSON.parse('{"' + customParams.queryString.replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');

                // get the filters related parameters prefn, prefv
                let prefs = [];
                Object.keys(params).filter(function (prop) {
                    if (prop.indexOf("pref") > -1) {
                        prefs[prop] = params[prop];
                    }
                });

                let prefsKeys = Object.keys(prefs);
                let prefKeysLength = prefsKeys.length - 1;
                // if we have preferences filter entries
                if (prefKeysLength > 0) {
                    // create object values pairing the prefn and prefv entries together
                    var prefsObj = [];
                    for (let i = 0; i < prefKeysLength; i++) {
                        var key1 = prefsKeys[i];
                        var key2 = prefsKeys[i+1];
                        prefsObj[prefs[key1]] = prefs[key2];
                        // skip the next entry because it was added as this entry's value
                        i++;
                    }

                    // add the final list of preferences to the params using the parsed prefsObj
                    params['preferences'] = prefsObj;
                }

                return params;
            }
        }
    }

    return null;
}

module.exports = {
    customRequestParamsToObj: customRequestParamsToObj
};
