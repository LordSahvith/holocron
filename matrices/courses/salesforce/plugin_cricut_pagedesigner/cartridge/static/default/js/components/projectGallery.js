/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./cartridges/plugin_cricut_pagedesigner/cartridge/client/default/js/components/projectGallery.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./cartridges/plugin_cricut_pagedesigner/cartridge/client/default/js/components/projectGallery.js":
/*!********************************************************************************************************!*\
  !*** ./cartridges/plugin_cricut_pagedesigner/cartridge/client/default/js/components/projectGallery.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Animates the progress slider in the horizontal gallery
 * @param {Object} slick - the full slick item with all the slides
 * @param {jQuery} nextSlide - the slide that will be active when the scroll completes
 * @param {num} scrollbarFade - the ID of the timeout timer
 *
 * @returns {num} scrollbarFade - the ID of the timeout timer
*/
function animateProgressBar(slick, nextSlide, scrollbarFade) {

    /**
     * Fade the progress slider out of view
    **/
    function scrollBarFadeOut() {
        slick.$slider.parent().siblings('.scrollbar-container').animate({opacity: 0}, 500);
    }

    //Stop the Scrollbar from fading if animation is initiated again before it has faded out.
    if(scrollbarFade) {
        clearTimeout(scrollbarFade);
    }

    let totalSlides = slick.$slides.length;
    let slideProgress = ((nextSlide + 1) / totalSlides) * 100;

    // Show the Scrollbar
    slick.$slider.parent().siblings('.scrollbar-container').animate({opacity: 1}, 150);

    // Update the width of the progress bar
    slick.$slider.parent().siblings('.scrollbar-container').children('.scrollbar').animate({width: slideProgress + '%'}, 500);

    // Wait 3 seconds then fade the Scrollbar Out
    scrollbarFade = setTimeout(scrollBarFadeOut, 3000);

    return scrollbarFade;
}

$(document).ready(function () {
    let scrollbarFade;

    $('.experience-slidesContainer').each(function(index) {
        $('.experience-slidesContainer').eq(index).slick({
            arrows: true,
            prevArrow: $('.projectGallery-previous').eq(index),
            nextArrow: $('.projectGallery-next').eq(index),
            centerMode: true,
            infinite: false
        });

        // Before the slide transitions
        $('.experience-slidesContainer').eq(index).on('beforeChange', function(event, slick, currentSlide, nextSlide){
            scrollbarFade = animateProgressBar(slick, nextSlide, scrollbarFade);
        });
    });
});

/***/ })

/******/ });
//# sourceMappingURL=projectGallery.js.map