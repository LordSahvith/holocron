'use strict';


function setCache(req, res, next) {
    res.cachePeriod = 2; 
    res.cachePeriodUnit = 'minutes'; 
    next();
}

module.exports = {setCache: setCache};
