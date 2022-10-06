'use strict';

var scrollAnimate = require('base/components/scrollAnimate');

/**
 * activate tab from URL anchor hash
 */
function setTabFromURL() {
    if (location.hash) {
        $('.tab-pane.fade.active.show').removeClass('active', 'show');
        $('a.nav-link.active').removeClass('active');
        $(location.hash).tab('show');
        $(`${location.hash}-tab`).addClass('active');
        scrollAnimate($('.pd-legal'));
    }
}

$(document).ready(function () {
    setTabFromURL();
    $('a.nav-link').on('click', function(){
        scrollAnimate($('.pd-legal'));
    });
});
