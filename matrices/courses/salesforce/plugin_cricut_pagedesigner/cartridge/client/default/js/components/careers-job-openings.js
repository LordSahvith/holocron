'use strict';

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
