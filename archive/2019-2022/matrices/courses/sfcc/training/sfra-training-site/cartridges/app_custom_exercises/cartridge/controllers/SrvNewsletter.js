"use strict";

var server = require("server");
var newsletterForm = server.forms.getForm("srvnewsletter");

//8-1 Define a variable named HookMgr that requires the HookMgr class
var HookMgr = require('dw/system/HookMgr');

//7-7 require "Logger" from dw.system package
var Logger = require('dw/system/Logger');

server.get("Start", function (req, res, next) {
  newsletterForm.clear();
  // 7-2 render the newsletter signup form, passing in the form
  // key: value - pdict.whatever.more from isml
  res.render("newsletter/srvnewslettersignup", { newsletterForm: newsletterForm });
  next();
});

/**
 * Sample server side validation
 * @param String email
 */
function validateEmail(email) {
  var regex = /^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$/;
  return regex.test(email);
}

server.post("HandleForm", function (req, res, next) {
  var Resource = require("dw/web/Resource");
  var storageService = require("*/cartridge/scripts/storageService"); // 7-2 require the storageService module

  //7-2  require dw.system.Transaction
  var Transaction = require("dw/system/Transaction");

  if (validateEmail(newsletterForm.email.value)) {
    //7-7 create a variable called "logger" with log file prefix as "NewsLogs" and logging
    //7-7 category as "newsletter"
    var logger = Logger.getLogger("NewsLogs", "newsletter");

    //7-2  start the transaction using appropriate method
    Transaction.begin();
    try {
      var co = storageService.storeNewsletterObject(newsletterForm);

      res.render("newsletter/srvnewslettersuccess", {
        firstName: newsletterForm.fname.value,
        lastName: newsletterForm.lname.value,
        newsletterObject: co,
      });
      // 7-2  commit the transaction using appropriate method
      Transaction.commit();

      //8-1 call app.email hook, specify the extensionPoint and function
      HookMgr.callHook('app.email', 'send', newsletterForm.email.value);

      //7-7 log a debug message that signup was successful
      logger.debug("\nInput params received: \nfirstName: {0}\n lastName: {1}\n email: {2}", newsletterForm.fname.value, newsletterForm.lname.value, newsletterForm.email.value);
    } catch (e) {
      // 7-2  undo the transaction using appropriate method
      Transaction.rollback();

      //7-7 log an error message "Problem with subscription: {0}", e.causeMessage
      logger.error("Problem with subscription: {0}", e.causeMessage);

      // 7-2 Create error.message.email.invalid.value  string which is exernalized in forms.properties file
      //fill in the ?? in the code below
      res.setViewData({ emailerror: Resource.msg("error.message.email.invalid.value", "forms", null) });
      res.render("newsletter/srvnewslettersignup", {
        newsletterForm: newsletterForm,
      });
    }
  } else {
    // 7-2 check that error.message.parse.email.profile.form is already defined in forms.properties in app_storefront_base
    res.setViewData({
      emailerror: Resource.msg(
        "error.message.parse.email.profile.form",
        "forms",
        null
      ),
    });
    res.render("newsletter/srvnewslettersignup", {
      newsletterForm: newsletterForm,
    });
  }
  next();
});

module.exports = server.exports();
