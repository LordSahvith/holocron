'use strict';

var debounce = require('lodash/debounce');
var keyboardAccessibility = require('../components/homeKeyboardAccessibility');
const isDesktopSize = 1006; // actually breaks at 1024

var setMenuEvents = function () {
    var isDesktop = $(window).innerWidth() > isDesktopSize;

    $('.js-sub-category a').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
    });

    if (isDesktop) {
        $('.js-hh-nav-toggle').off('click');
        $('.js-hh-nav-toggle').attr('aria-expanded', 'false');
        $('.nav-hamburger').removeClass('open');
        $('.js-hh-nav').removeClass('active');
        $('.js-hh-sub-category').off('click');
        $('.js-hh-nav-item').removeClass('active');
        $('.js-hh-nav-item-dropdown').removeClass('active');

        $('.js-hh-nav-item').off('mouseenter');
        $('.js-hh-nav-item').on('mouseenter', function(e) {
            e.stopPropagation();
            $(this).find('.hh-nav-link').attr('aria-expanded', 'true');
            $(this).children('.js-hh-nav-item-dropdown').addClass('active');
        });

        $('.js-hh-nav-item').off('mouseleave');
        $('.js-hh-nav-item').on('mouseleave', function(e) {
            e.stopPropagation();
            $(this).find('.hh-nav-link').attr('aria-expanded', 'false');
            $(this).children('.js-hh-nav-item-dropdown').removeClass('active');
        });
    } else {
        $('.js-hh-nav-item').off('mouseenter');
        $('.js-hh-nav-item').off('mouseleave');
        $('.js-hh-nav-item').attr('aria-expanded', 'false');
        $('.js-hh-nav-item').removeClass('active');
        $('.js-hh-nav-item .hh-nav-link').removeClass('active');
        $('.js-hh-nav-item-dropdown').removeClass('active');
        // mobile menu toggle
        $('.js-hh-nav-toggle').off('click');
        $('.js-hh-nav-toggle').on('click', function(e) {
            e.stopPropagation();
            if ($('.js-hh-nav').hasClass('active')) {
                $('.js-hh-nav').removeClass('active');
                $(this).attr('aria-expanded', 'false');
                $('.nav-hamburger').removeClass('open');
                $('.js-hh-nav-item').removeClass('active');
                $('.js-hh-nav-item-dropdown').removeClass('active');
            } else {
                $('.js-hh-nav').addClass('active');
                $(this).attr('aria-expanded', 'true');
                $('.nav-hamburger').addClass('open');
            }
        });
        // mobile toggle for full nav item
        $('.js-hh-sub-category').off('click');
        $('.js-hh-sub-category').on('click', function() {
            if ($(this).parent().hasClass('active')) {
                $(this).parent().attr('aria-expanded', 'false');
                $(this).parent().removeClass('active');
                $(this).parent().children('.js-hh-nav-item-dropdown').removeClass('active');
            } else {
                $(this).parent().attr('aria-expanded', 'true');
                $(this).parent().addClass('active');
                $(this).parent().children('.js-hh-nav-item-dropdown').addClass('active');
            }
        });
    }
};

module.exports = {
    init: function () {
        $(window).on('load', function() {
            setMenuEvents();
        });

        $(window).on('resize', debounce(function () {
            setMenuEvents();
        }, 100));

        // main nav access
        keyboardAccessibility('.hh-nav-link',
            {
                40: function (menuItem) { // down
                    if (menuItem.hasClass('js-hh-sub-category')) { // top level
                        $('.hh-nav-link').removeClass('active').attr('aria-expanded', 'false')
                            .parent().siblings('.js-hh-nav-item-dropdown')
                            .removeClass('active');
                        menuItem.children('.hh-nav-link').attr('aria-expanded', 'true');
                        menuItem.parent().children('.js-hh-nav-item-dropdown').addClass('active').attr('aria-expanded', 'true');
                        menuItem.parent().find('.js-hh-nav-item-dropdown')
                            .find('.hh-nav-dropdown-item')
                            .first()
                            .children('a')
                            .focus();
                    }
                },
                39: function (menuItem) { // right
                    if (menuItem.parent().hasClass('hh-nav-item')) { // top level
                        $('.hh-nav-link').removeClass('active').attr('aria-expanded', 'false')
                            .parent().siblings('.js-hh-nav-item-dropdown')
                            .removeClass('active');
                        menuItem.parent().next().children().first().children('.hh-nav-link').focus();
                    }
                },
                37: function (menuItem) { // left
                    if (menuItem.parent().hasClass('hh-nav-item')) { // top level
                        $('.hh-nav-link').removeClass('active').attr('aria-expanded', 'false')
                            .parent().siblings('.js-hh-nav-item-dropdown')
                            .removeClass('active');
                        menuItem.parent().prev().children().first().children('.hh-nav-link').focus();
                    }
                },
                27: function (menuItem) { // escape
                    menuItem.parents('.js-hh-nav').removeClass('active')
                        .siblings('.js-hh-nav-toggle')
                        .attr('aria-expanded', 'false')
                        .focus();
                    $('.nav-hamburger').removeClass('open');
                }
            },
            function () {
                return $(this).parent();
            }
        );
        //subnav access
        keyboardAccessibility('.hh-nav-dropdown-link',
            {
                39: function (menuItem) { // right
                    if (menuItem.hasClass('hh-nav-dropdown-item')) { // top level
                        menuItem.next().find('.hh-nav-dropdown-link').focus();
                    }
                },
                37: function (menuItem) { // left
                    if (menuItem.hasClass('hh-nav-dropdown-item')) { // top level
                        menuItem.prev().find('.hh-nav-dropdown-link').focus();
                    }
                },
                27: function (menuItem) { // escape
                    $('.hh-nav-link').removeClass('active').attr('aria-expanded', 'false')
                        .parent().siblings('.js-hh-nav-item-dropdown')
                        .removeClass('active');
                    menuItem.parents('.js-hh-nav-item').find('.hh-nav-link').focus();
                }
            },
            function () {
                return $(this).parent();
            }
        );

        // sticky nav behavior
        const PRM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.navigation = document.querySelector('header.pd-header-container');

        this.navStickyScroll = () => {
            let boundedScrollY = Math.max(scrollY, 0);
            let scrollUp = this.oldScroll > boundedScrollY;

            if (this.navigation.classList.contains('navigationScrollHidden')) {
                if (scrollUp) {
                    this.topScroll = boundedScrollY;
                    this.navigation.classList.remove('navigationScrollHidden');
                    this.navigation.classList.add('navigationScrollShowing');
                    this.navigation.style.transform = `translate3d(0, ${Math.min(-Math.min(boundedScrollY - this.topScroll, this.navigationHeight + 1), 0)}px, 0)`;
                }
            }
            else if (this.navigation.classList.contains('navigationScrollShowing')) {
                if (scrollUp) {
                    this.topScroll = boundedScrollY;
                }
            }
            else {
                if (Math.min(-Math.min(boundedScrollY - this.topScroll, this.navigationHeight + 1), 0) >= 0) {
                    this.topScroll = boundedScrollY;
                }
                this.navigation.style.transform = `translate3d(0, ${Math.min(-Math.min(boundedScrollY - this.topScroll, this.navigationHeight + 1), 0)}px, 0)`;

                if (Math.min(boundedScrollY - this.topScroll, this.navigationHeight + 1) === this.navigationHeight + 1) {
                    this.navigation.classList.add('navigationScrollHidden');
                }
            }
            this.oldScroll = boundedScrollY;
        };

        this.navStickyTransitionEnd = (e) => {
            if (e.propertyName === 'transform') {
                this.navigation.classList.remove('navigationScrollShowing');
                this.topScroll = Math.max(scrollY, 0);
            }
        };

        // Shows nav on scroll
        this.oldScroll = 0;
        this.topScroll = 0;

        this.navigation.addEventListener("transitionend", this.navStickyTransitionEnd);
        this.navigationHeight = this.navigation.clientHeight;

        if(!PRM) {
            window.addEventListener("scroll", this.navStickyScroll);
        }
    }
};
