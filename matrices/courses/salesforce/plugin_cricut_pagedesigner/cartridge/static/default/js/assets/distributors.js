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
/******/ 	return __webpack_require__(__webpack_require__.s = "./cartridges/plugin_cricut_pagedesigner/cartridge/client/default/js/assets/distributors.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./cartridges/plugin_cricut_pagedesigner/cartridge/client/default/js/assets/distributors.js":
/*!**************************************************************************************************!*\
  !*** ./cartridges/plugin_cricut_pagedesigner/cartridge/client/default/js/assets/distributors.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

'use-strict';

const COUNTRY_CARD = document.querySelector('.cwg-card');
const COUNTRY_SECTION_TOGGLE_BUTTON = document.querySelector('.cwg-toggle-button');
let showHideButton = COUNTRY_SECTION_TOGGLE_BUTTON.querySelector('.showAllHideAll');
const COUNTRY_CODE = $('.cwg-vendorList-wrapper').data('country-code');
const accordionComponent = {

    /**
     * Animates slide functionality on given element
     * @param {Event} evt event to prevent certain default functionality
     * @param {Element} accordion Parent element of slidable content
     * @param {Element} button element to trigger accordion
     */
    accordionToggle: function (evt, accordion, button) {
        // prevent a tags for cwg-accordion elements
        if (accordion.nodeName.toLowerCase() === 'a') {
            evt.preventDefault();
            return;
        }
        let accordionFirstChild = accordion.firstElementChild;
        let containerContent = accordion.querySelector('.cwg-accordion-content');
        let caret = accordionFirstChild.querySelector('svg.caret');

        if (caret !== null && caret !== undefined && caret !== '') {
            caret.classList.toggle('isOpen');
        }

        let height = '';

        if (!accordion.classList.contains('isOpen')) {
            accordion.classList.add('isOpen');
            button.setAttribute('aria-expanded', true);
            containerContent.style.height = 'auto';

            height = `${containerContent.clientHeight}px`;

            containerContent.style.height = '0px';

            setTimeout(() => {
                containerContent.style.height = height;
            }, 25);

            containerContent.addEventListener('transitionend', () => {
                containerContent.style.height = 'auto';
            }, {
                once: true
            });
        } else {
            height = `${containerContent.clientHeight}px`;
            containerContent.style.height = height;
            setTimeout(() => {
                containerContent.style.height = '0px';
            }, 25);

            containerContent.addEventListener('transitionend', () => {
                accordion.classList.remove('isOpen');
                button.setAttribute('aria-expanded', false);
            }, {
                once: true
            });
        }
    },

    setEventListeners: function () {
        const accordions = document.querySelectorAll('.cwg-accordion');

        accordions.forEach(accordion => {
            let accordionTitle = accordion.querySelector('.cwg-accordion-title');

            accordionTitle.addEventListener('click', (e) => {
                this.accordionToggle(e, accordion, accordionTitle);
            });

            accordionTitle.addEventListener('keydown', (e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                    if (e.key === ' ') {
                        e.preventDefault();
                    }
                    this.accordionToggle(e, accordion, accordionTitle);
                }
            });
        });
    }
};

/**
 * Toggles hide / show text
 */
function toggleHideShowText() {
    let showHideCopy = showHideButton.innerHTML.toLowerCase() === 'hide' ? 'Show' : 'Hide';

    showHideButton.innerHTML = showHideCopy;
}

/**
 * Toggles hide / show text
 */
function setEventListeners() {
    COUNTRY_SECTION_TOGGLE_BUTTON.addEventListener('click', () => toggleHideShowText());
    COUNTRY_SECTION_TOGGLE_BUTTON.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
            if (e.key === ' ') {
                e.preventDefault();
            }
            toggleHideShowText();
        }
    });
}

/**
 * Displays the list of regions / distributors if the current region isn't WO
 */
function showCountries() {

    if(!COUNTRY_CODE || COUNTRY_CODE === 'WO') {
        accordionComponent.accordionToggle(null, COUNTRY_SECTION_TOGGLE_BUTTON.parentElement, showHideButton.parentElement);
        COUNTRY_SECTION_TOGGLE_BUTTON.classList.add('hidden');
        COUNTRY_CARD.classList.add('hidden');
        toggleHideShowText();
    }
}

$(document).ready(function () {
    setEventListeners();
    accordionComponent.setEventListeners();
    showCountries();
});


/***/ })

/******/ });
//# sourceMappingURL=distributors.js.map