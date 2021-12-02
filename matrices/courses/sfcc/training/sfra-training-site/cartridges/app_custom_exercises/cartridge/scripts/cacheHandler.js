'use strict';

function setCache(req, res, next) {
    res.cachePeriod = 2; // eslint-disable-line no-param-reassign
    res.cachePeriodUnit = 'minutes'; // eslint-disable-line no-param-reassign
    next();
}

module.exports = {
	setCache: setCache
};
