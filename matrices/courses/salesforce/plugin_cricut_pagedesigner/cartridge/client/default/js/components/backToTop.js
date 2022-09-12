'use strict';

var debounce = require('lodash/debounce');

/**
 * Scrolls to the selected passed to the element
 * @param {string} selector element selector
 */
function scrollTo(selector) {
    if (selector) {
        $([document.documentElement, document.body]).animate({
            scrollTop: $(selector).offset().top
        }, 500);
    }
}

/**
 * Show back to top when moved past element
 * @param {HTML} target element to show button once scrolled past
 */
function backToTopShow(target) {
    // add fade in class to back to top button when moved past selector
    if ($(window).scrollTop() > $(target).offset().top) {
        $('#backToTop').addClass('fadeIn');
    } else {
        $('#backToTop').removeClass('fadeIn');
    }
}

$(document).ready(function () {
    let scrollToEl = $('#backToTop').attr('data-scroll');
    let elToShowButton = $('#backToTop').attr('data-target');

    $('#backToTop').on('click', debounce(function () {
        scrollTo(scrollToEl);
    }, 100));

    $(window).on('scroll', debounce(function() {
        backToTopShow(elToShowButton);
    }, 100));
});
