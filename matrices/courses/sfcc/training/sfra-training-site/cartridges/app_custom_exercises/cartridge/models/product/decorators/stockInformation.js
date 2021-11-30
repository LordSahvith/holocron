'use strict';

module.exports = function (object, apiProduct) {
    var invRec = apiProduct.availabilityModel.inventoryRecord;
    //Use Object.defineProperty to add stockInformation to the object 
    Object.defineProperty(object, 'stockInformation', {
        enumerable: true,
        value: invRec==null ? 0 :parseInt( invRec.ATS,10)
    });
};




