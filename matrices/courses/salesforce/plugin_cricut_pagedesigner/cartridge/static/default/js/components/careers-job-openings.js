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
/******/ 	return __webpack_require__(__webpack_require__.s = "./cartridges/plugin_cricut_pagedesigner/cartridge/client/default/js/components/careers-job-openings.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./cartridges/plugin_cricut_pagedesigner/cartridge/client/default/js/components/careers-job-openings.js":
/*!**************************************************************************************************************!*\
  !*** ./cartridges/plugin_cricut_pagedesigner/cartridge/client/default/js/components/careers-job-openings.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const ENDPOINT = 'https://api.smartrecruiters.com/v1/companies/cricut/postings';

const jobs = [];
const sortedJobs = [];
const sortedDepartments = [];
const sortedDepAndJobs = [];
const jobLists = document.querySelector('.job-lists');

/**
 * sorts all data by job title
 */
function sortJobs() {
    sortedJobs.push(...jobs.sort((a, b) => a.name > b.name ? 1 : -1));
}

/**
 * creates departments from sortedJobs
 * stores each job into department
 */
function createDepartments() {
    const departments = sortedJobs.reduce((obj, item) => {
        let departmentName = item.department.label;
        if (!obj[departmentName]) {
            obj[departmentName] = [departmentName];
            obj[departmentName]['department'] = departmentName;
            obj[departmentName]['jobs'] = [];
        }
        obj[departmentName]['jobs'].push(...[item]);
        return obj;
    }, {});

    // switch from associative array to indexed array
    for (var item in departments) {
        sortedDepartments.push(departments[item]);
    }
}

/**
 * sorts jobs within departments
 */
function sortJobsInDepartments() {
    sortedDepAndJobs.push(...sortedDepartments.sort((a, b) => a.department > b.department ? 1 : -1));
}

/**
 * loop through sortedDepAndJobs
 * pass each department to createTiles()
 * display to screen
 */
function displayData() {
    let accordionItem = '';
    let department = '';
    for (let key in sortedDepAndJobs) {
        department = sortedDepAndJobs[key];
        if (department.jobs.length !== 0) {
            accordionItem +=
                `<div class="card">
                    ${createJobsAccordion(department, key)}
                </div>`;
        }
    }
    jobLists.innerHTML = accordionItem;
}

/**
 * @param {Object} department create tiles from department & string of html
 * @param {number} divNum number to sync up divs for aria
 * @return {string} output
 */
function createJobsAccordion(department, divNum) {
    let output =
        `<div class="card-header department" id="departmentHeading${divNum}">
                <h3 class="mb-0">
                    <button class="btn btn-link btn-block text-left department-title ${divNum > 0 ? 'collapsed' : ''}" type="button" data-toggle="collapse" data-target="#departmentCollapse${divNum}" aria-expanded="${divNum == 0 ? 'true' : 'false'}" aria-controls="departmentCollapse${divNum}">
                        <span>${department.department}</span>
                        <svg class="caret" width="14" height="7" viewBox="0 0 14 7" fill="none">
                            <use xlink:href="#caret"></use>
                        </svg>
                    </button>
                </h3>
            </div>`;

    let baseUrl = "https://jobs.smartrecruiters.com/Cricut/";
    for (let i = 0; i < department.jobs.length; i++) {
        let applyUrl = baseUrl + department.jobs[i].id;
        output +=
            ` <div id="departmentCollapse${divNum}" class="collapse department-jobs ${divNum == 0 ? 'show' : ''}" aria-labelledby="departmentHeading${divNum}" data-parent="#departmentHeading${divNum}">
                <div class="card-body">
                    <a href="${applyUrl}" target="_blank">
                        <span class="job-title"><span>${department.jobs[i].name}</span></span>
                        <span class="job-location"><span>${department.jobs[i].location.city}, ${department.jobs[i].location.region}</span></span>
                    </a>
                </div>
            </div>`;
    }
    return output;
}

$(document).ready(function () {
    /**
     * API Promise (GET call)
     * Controls flow of data
     */
    fetch(ENDPOINT)
        .then(blob => blob.json())
        .then(data => jobs.push(...data.content))
        .then(sortJobs)
        .then(createDepartments)
        .then(sortJobsInDepartments)
        .then(displayData);
});


/***/ })

/******/ });
//# sourceMappingURL=careers-job-openings.js.map