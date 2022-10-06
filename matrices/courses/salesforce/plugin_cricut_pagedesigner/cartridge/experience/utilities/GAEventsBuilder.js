'use strict';

module.exports = function (category, action, label) {
    var gaCategory = category ? category.trim() : null;
    var gaAction = action ? action.trim() : null;
    var gaLabel = label ? label.trim() : null;

    if (gaCategory && gaAction && gaLabel) {

        let eventString = {
            eventCategory: gaCategory.replace(/[_ .]/g, "-"),
            eventAction: gaAction.replace(/[_ .]/g, "-"),
            eventLabel: gaLabel.replace(/[_ .]/g, "-")
        };

        var eventAttr = ` data-ga-event="{'eventCategory':'` + eventString.eventCategory + `','eventAction':'` + eventString.eventAction + `','eventLabel':'` + eventString.eventLabel + `','eventNonInteractionHit':'FALSE','event':'gaEvent'}"`;

        return eventAttr;
    } else {
        return '';
    }
};
