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
/******/ 	return __webpack_require__(__webpack_require__.s = "./cartridges/plugin_cricut_pagedesigner/cartridge/client/default/js/assets/machine/autopress/controlPod.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./cartridges/plugin_cricut_pagedesigner/cartridge/client/default/js/assets/machine/autopress/controlPod.js":
/*!******************************************************************************************************************!*\
  !*** ./cartridges/plugin_cricut_pagedesigner/cartridge/client/default/js/assets/machine/autopress/controlPod.js ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * autopress control pod js
 * @param {section} section - a section
 */
function VulcanControlPad(section) {
    /*
    Utilities
    */

    this.normalizeRange = (value, inBottom, inTop, outBottom, outTop) => {
        if (outBottom === undefined) outBottom = 0;
        if (outTop === undefined) outTop = 1;

        const outDelta = outTop - outBottom;
        const inDelta = inTop - inBottom;
        const normalized = Math.min(Math.max((value - inBottom) / inDelta, 0), 1);

        return outBottom + (outDelta * normalized);
    };

    this.blendColor = (value, color1, color2) => {
        const dR = color2.r - color1.r;
        const dG = color2.g - color1.g;
        const dB = color2.b - color1.b;
        return {
            r: color1.r + dR * value,
            g: color1.g + dG * value,
            b: color1.b + dB * value
        };
    };

    /*
    Event Listeners
    */

    this.onResize = () => {
        const boundingRect = this.section.getBoundingClientRect();
        this.topY = scrollY + boundingRect.y;
        this.bottomY = this.topY + boundingRect.height;
        this.bottomYOffset = this.bottomY - innerHeight;
    };

    this.onScroll = () => {
        this.progress = Math.max(Math.min((scrollY - this.topY) / (this.bottomYOffset - this.topY), 1), 0);
        this.enterProgress = Math.max(Math.min(1 + (scrollY - this.topY) / innerHeight, 1), 0);
        this.exitProgress = Math.max(Math.min((scrollY - this.bottomYOffset) / innerHeight, 1), 0);

        if (this.prevProgress === this.progress &&
            this.prevEnterProgress === this.enterProgress &&
            this.prevExitProgress === this.exitProgress) return;

        if (this.hasFired && this.enterProgress === 0) {
            if (this.video.fastSeek) {
                this.video.pause();
                this.video.fastSeek(0);
            }
            else {
                this.video.pause();
                this.video.currentTime = 0;
            }
            this.hasFired = false;
        }

        if (!this.hasFired && this.enterProgress > 0.6) {
            this.video.play();
            this.hasFired = true;
        }

        const hotProgress = this.normalizeRange(this.progress, 0.15, 0.55);
        this.hotText.style.opacity = 1 - hotProgress;
        this.hotText.style.transform = `translateY(${hotProgress * -30}px)`;
        this.hotText.style.pointerEvents = (hotProgress === 1) ? "none" : "";

        const controlProgress = this.normalizeRange(this.progress, 0.5, 0.95);
        this.controlText.style.opacity = controlProgress;
        this.controlText.style.transform = `translateY(${(1 - controlProgress) * 30}px)`;
        this.controlText.style.pointerEvents = controlProgress ? "none" : "";

        if (this.progress < 1) {
            const colorProgress = this.normalizeRange(this.progress, 0.15, 0.95);
            const c = this.blendColor(colorProgress, this.gray, this.orange);
            const event = new CustomEvent('bgColor', {detail: c});
            window.dispatchEvent(event);
        }
        else {
            const colorProgress = this.normalizeRange(this.exitProgress, 0.55, 0.9);
            const c = this.blendColor(colorProgress, this.orange, this.gray);
            const event = new CustomEvent('bgColor', {detail: c});
            window.dispatchEvent(event);
        }

        this.prevProgress = this.progress;
        this.prevEnterProgress = this.enterProgress;
        this.prevExitProgress = this.exitProgress;
    };

    this.onBgColor = (e) => {
        $('.page.page-designer').css('background-color', `rgb(${e.detail.r}, ${e.detail.g}, ${e.detail.b})`);
    };

    // Deferred constructor
    const construct = () => {
        this.section = section;
        this.hotText = section.getElementsByClassName("hot-text")[0];
        this.controlText = section.getElementsByClassName("control-text")[0];
        this.video = section.getElementsByTagName("video")[0];
        this.video.load();

        this.gray = {r: 240, g: 240, b: 240};
        this.orange = {r: 243, g: 221, b: 202};

        window.addEventListener("resize", this.onResize);
        window.addEventListener("scroll", this.onScroll);
        window.addEventListener("bgColor", this.onBgColor);

        this.onResize();
        this.onScroll();

        this.hasFired = false;
    };

    if (scrollY < innerHeight) {
        if (window.requestIdleCallback) {
            requestIdleCallback(construct);
        }
        else {
            setTimeout(construct, 1600);
        }
    }
    else {
        construct();
    }
}

$(document).ready(function () {
    const vulcanControlPads = document.querySelectorAll(".vulcan-control-pod");
    vulcanControlPads.forEach(vulcanControlPad => new VulcanControlPad(vulcanControlPad));
});

/***/ })

/******/ });
//# sourceMappingURL=controlPod.js.map