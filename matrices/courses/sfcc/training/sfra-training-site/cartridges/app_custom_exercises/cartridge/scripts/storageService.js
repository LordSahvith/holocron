'use strict';

var CustomObjectMgr = require('dw/object/CustomObjectMgr');
function storeNewsletterObject(newsletterForm) {
     var CustomObject = // 7-2 Add code to create the custom object with CustomObject type "NewsletterSubscription and primiary key as email from "newsletterform"
      // 7-2 Add code to feed data from the form to the custom object
      //7-2 Hint: CustomObject.custom.firstName = newsletterForm.fname.value;
                        //7-6 Add code to create a custom object attribute for the promo opt-in
                        return CustomObject;

}

module.exports = {storeNewsletterObject: storeNewsletterObject};