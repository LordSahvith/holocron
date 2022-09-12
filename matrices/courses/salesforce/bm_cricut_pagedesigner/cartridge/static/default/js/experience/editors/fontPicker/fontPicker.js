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
/******/ 	return __webpack_require__(__webpack_require__.s = "./cartridges/bm_cricut_pagedesigner/cartridge/client/default/js/experience/editors/fontPicker/fontPicker.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./cartridges/bm_cricut_pagedesigner/cartridge/client/default/js/experience/editors/fontPicker/fontPicker.js":
/*!*******************************************************************************************************************!*\
  !*** ./cartridges/bm_cricut_pagedesigner/cartridge/client/default/js/experience/editors/fontPicker/fontPicker.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(() => {
    const variables = __webpack_require__(/*! pd/variables */ "./cartridges/plugin_cricut_pagedesigner/cartridge/client/default/js/variables.js");
    var rootEditorElement;

    /**
     * Generate font selections
     * @param {object} fonts the font variables
     * @returns {HTML} markup that is rendered
     */
    function generateFontHTML(fonts) {
        let fontOptionsHtml = `   <option value="" hidden>Select a font</option>`;
        for(const key in fonts) {
            let fontData = fonts[key];
            fontOptionsHtml += `<option value="${fontData.variable ? fontData.variable : 'default' }" class="pd-font-option ${fontData.variable}">${fontData.name}</option>`;
        }
        return fontOptionsHtml;
    };

    /**
     * initializes the base markup before page is ready. This is not part of the API, and called explicitely at the end of this module.
     */
    function init() {
        rootEditorElement = document.createElement('div');
        rootEditorElement.innerHTML = `<select id="pd-font-selectbox" data-selected="">`
        + generateFontHTML(variables.brandFonts) +
        `</select>`;

        document.body.appendChild(rootEditorElement);
    };

    /** the page designer signals readiness to show this editor and provides an optionally pre selected value */
    listen('sfcc:ready', async ({ value, config, isDisabled, isRequired, dataLocale, displayLocale }) => {
        const selectedValue = typeof value === 'object' && value !== null && typeof value.value === 'string' ? value.value : null;

        rootEditorElement.querySelector('#pd-font-selectbox').addEventListener('change', function (event) {
            const selectedValue = event.target.value;
            let selectedElement = event.target.querySelector(`option[value=${selectedValue}]`);
            selectedElement.selected = true;
            let fontName = selectedElement.innerHTML;
            emit({
                type: 'sfcc:interacted'
            });
            emit({
                type: 'sfcc:value',
                payload: selectedValue ? { value: selectedValue } : null
            });
        });

        if (selectedValue) {
            let selectedElement = rootEditorElement.querySelector(`option[value=${selectedValue}]`);
            selectedElement.selected = true;
            rootEditorElement.querySelector('#pd-font-selectbox').value = selectedValue;
        }

    });
    // When a value was selected
    listen('sfcc:value', value => { });
    // When the editor must require the user to select something
    listen('sfcc:required', value => { });
    // When the editor is asked to disable its controls
    listen('sfcc:disabled', value => { });

    init();

})();


/***/ }),

/***/ "./cartridges/plugin_cricut_pagedesigner/cartridge/client/default/js/variables.js":
/*!****************************************************************************************!*\
  !*** ./cartridges/plugin_cricut_pagedesigner/cartridge/client/default/js/variables.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

const brandColors = {
    primary: [
        {name: 'Forrest', variable: 'forrest', hex: '0a3728', contrastPairings: [{name:'white', hex:'ffffff'}]},
        {name: 'Accessible Green', variable: 'accessible-green', hex: '168666', contrastPairings: [{name:'white', hex:'ffffff'}]},
        {name: 'Cricut Green', variable: 'cricut-green', hex: '00a977', contrastPairings: [{name:'white', hex:'ffffff'}]},
        {name: 'Shamrock', variable: 'shamrock', hex: 'b9dcc8', contrastPairings: [{name:'black', hex:'000000'}]},
        {name: 'Shamrock Light', variable: 'shamrock-light', hex: 'dcede3', contrastPairings: [{name:'black', hex:'000000'}]}
    ],
    neutral: [
        {name: 'Black', variable: 'black', hex: '000000', contrastPairings: [{name:'white', hex:'ffffff'}]},
        {name: 'Dark Gray', variable: 'dark-gray', hex: '555555', contrastPairings: [{name:'white', hex:'ffffff'}]},
        {name: 'Mid Gray', variable: 'mid-gray', hex: '949494', contrastPairings: [{name:'white', hex:'ffffff'}]},
        {name: 'Stone', variable: 'stone', hex: 'bebebe', contrastPairings: [{name:'black', hex:'000000'}]},
        {name: 'Light Gray', variable: 'light-gray', hex: 'e4e4e4', contrastPairings: [{name:'black', hex:'000000'}]},
        {name: 'Fog', variable: 'fog', hex: 'f0f0f0', contrastPairings: [{name:'black', hex:'000000'}]},
        {name: 'Alabaster', variable: 'alabaster', hex: 'fafafa', contrastPairings: [{name:'black', hex:'000000'}]},
        {name: 'White', variable: 'white', hex: 'ffffff', contrastPairings: [{name:'black', hex:'000000'}]}
    ],
    secondary: [
        {name: 'Sky', variable: 'sky', hex: 'a5cdeb', contrastPairings: [{name:'black', hex:'000000'}]},
        {name: 'Ocean', variable: 'ocean', hex: '0f4bc3', contrastPairings: [{name:'white', hex:'ffffff'}]},
        {name: 'Indigo', variable: 'indigo', hex: '00237d', contrastPairings: [{name:'white', hex:'ffffff'}]},
        {name: 'Corn', variable: 'corn', hex: 'ffd25f', contrastPairings: [{name:'black', hex:'000000'}]},
        {name: 'Eggnog', variable: 'eggnog', hex: 'ffebc8', contrastPairings: [{name:'black', hex:'000000'}]},
        {name: 'Sand', variable: 'sand', hex: 'f0e6dc', contrastPairings: [{name:'black', hex:'000000'}]},
        {name: 'Sand Light', variable: 'sand-light', hex: 'fbf2e9', contrastPairings: [{name:'black', hex:'000000'}]},
        {name: 'Pale Pink', variable: 'pale-pink', hex: 'fac3be', contrastPairings: [{name:'black', hex:'000000'}]},
        {name: 'Salmon', variable: 'salmon', hex: 'eb786e', contrastPairings: [{name:'black', hex:'000000'}]},
        {name: 'Manderine', variable: 'manderine', hex: 'ff6432', contrastPairings: [{name:'black', hex:'000000'}]},
        {name: 'Orchid', variable: 'orchid', hex: '8c005a', contrastPairings: [{name:'white', hex:'ffffff'}]},
        {name: 'Dark Wood', variable: 'dark-wood', hex: '461e14', contrastPairings: [{name:'white', hex:'ffffff'}]},
        {name: 'Ginger Bread', variable: 'ginger-bread', hex: 'af783c', contrastPairings: [{name:'white', hex:'ffffff'}]},
        {name: 'Burnt Orange', variable: 'burnt-orange', hex: 'c75001', contrastPairings: [{name:'white', hex:'ffffff'}]}
    ],
    status: [
        {name: 'Error Dark', variable: 'error-dark', hex: '721515', contrastPairings: [{name:'white', hex:'ffffff'}]},
        {name: 'Error Medium', variable: 'error-medium', hex: 'aa0000', contrastPairings: [{name:'white', hex:'ffffff'}]},
        {name: 'Error Light', variable: 'error-light', hex: 'ffd3d3', contrastPairings: [{name:'black', hex:'000000'}]},
        {name: 'Warning Dark', variable: 'warning-dark', hex: 'af2e02', contrastPairings: [{name:'white', hex:'ffffff'}]},
        {name: 'Warning Medium', variable: 'warning-medium', hex: 'bd5b00', contrastPairings: [{name:'white', hex:'ffffff'}]},
        {name: 'Warning Light', variable: 'warning-light', hex: 'ffdbba', contrastPairings: [{name:'black', hex:'000000'}]},
        {name: 'Success Dark', variable: 'success-dark', hex: '244916', contrastPairings: [{name:'white', hex:'ffffff'}]},
        {name: 'Success Medium', variable: 'success-medium', hex: '23650c', contrastPairings: [{name:'white', hex:'ffffff'}]},
        {name: 'Success Light', variable: 'success-light', hex: 'd7e8d1', contrastPairings: [{name:'black', hex:'000000'}]}
    ],
    dim: [
        {name: 'Black Dim', variable: 'black-dim', hex: '000000', contrastPairings: [{name:'white', hex:'ffffff'}]},
    ]
};

const brandFonts = {
    euclid: {name: 'Euclid', variable: ''},
    gascogne: {name: 'Gascogne', variable: 'font-serif'}
};

module.exports = {
    brandColors: brandColors,
    brandFonts: brandFonts
};


/***/ })

/******/ });
//# sourceMappingURL=fontPicker.js.map