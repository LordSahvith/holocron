/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./client/js/components/cardForm.js":
/*!******************************************!*\
  !*** ./client/js/components/cardForm.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _cardInfo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cardInfo */ \"./client/js/components/cardInfo.js\");\n/* harmony import */ var _cardInfo__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_cardInfo__WEBPACK_IMPORTED_MODULE_0__);\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function () {\n  var cardName = document.querySelector('#cardName');\n  var cardId = document.querySelector('#cardSetCode');\n  var cardNameButton = document.querySelector('#cardNameButton');\n  cardNameButton.addEventListener('click', (_cardInfo__WEBPACK_IMPORTED_MODULE_0___default()));\n  cardName.addEventListener('keyup', function (e) {\n    var keyPressed = e.which || e.key;\n    if (keyPressed === 'Enter' || keyPressed === 13) {\n      _cardInfo__WEBPACK_IMPORTED_MODULE_0___default()();\n    }\n  });\n  cardId.addEventListener('keyup', function (e) {\n    var keyPressed = e.which || e.key;\n    if (keyPressed === 'Enter' || keyPressed === 13) {\n      _cardInfo__WEBPACK_IMPORTED_MODULE_0___default()();\n    }\n  });\n});\n\n//# sourceURL=webpack://app/./client/js/components/cardForm.js?");

/***/ }),

/***/ "./client/js/components/cardInfo.js":
/*!******************************************!*\
  !*** ./client/js/components/cardInfo.js ***!
  \******************************************/
/***/ ((module) => {

eval("var CARD_API = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?name=';\nvar FULL_CARD_DATA = document.querySelector('.fullCardData');\nvar MATCHING_SET = document.querySelector('.matchingSet');\nvar fullCardData = {};\nvar cardSetMatchData = {};\nfunction getCardInfo() {\n  var cardText = cardName.value;\n  console.log('card: ', cardText);\n  // if (cardText.length > 0) {\n  //     console.log('name: ', cardText);\n  //     console.log('url: ', CARD_API + cardText);\n  //     fetch(CARD_API + cardText)\n  //         .then((cardData) => cardData.json())\n  //         .then((cardData) => getCardData(cardData.data))\n  //         .then((cardData) => getCardSetData(cardData))\n  //         .then((cardSets) => getCardSetCodeData(cardSets));\n  // }\n}\n\nfunction getCardData(data) {\n  fullCardData = data;\n  printToScreen(fullCardData, FULL_CARD_DATA);\n  return fullCardData;\n}\nfunction getCardSetData(data) {\n  var cardSets = data.map(function (card) {\n    return card.card_sets;\n  });\n  return cardSets;\n}\nfunction getCardSetCodeData(data) {\n  for (var i = 0; i < data[0].length; i++) {\n    if (data[0][i].set_code.toLowerCase() === cardId.value) {\n      cardSetMatchData = data[0][i];\n    }\n  }\n  printToScreen(cardSetMatchData, MATCHING_SET);\n  return cardSetMatchData;\n}\nmodule.exports = getCardInfo;\n\n//# sourceURL=webpack://app/./client/js/components/cardInfo.js?");

/***/ }),

/***/ "./client/js/index.js":
/*!****************************!*\
  !*** ./client/js/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_cardForm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/cardForm */ \"./client/js/components/cardForm.js\");\n\n(0,_components_cardForm__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n\n//# sourceURL=webpack://app/./client/js/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./client/js/index.js");
/******/ 	
/******/ })()
;