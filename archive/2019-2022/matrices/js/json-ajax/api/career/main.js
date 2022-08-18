const ENDPOINT = 'https://api.smartrecruiters.com/v1/companies/cricut/postings';

const jobs = [];
const sortedJobs = [];
const sortedDepartments = [];
const sortedDepAndJobs = [];
const gridTile = document.querySelector('.grid-tile-container');

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
    .then(displayData)
    .then(removeSpinner)
    .catch(error => console.log(error.message));;

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
            obj[departmentName]["department"] = departmentName;
            obj[departmentName]["jobs"] = [];
        }
        obj[departmentName]["jobs"].push(...[item]);
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

// loop through sortedDepAndJobs
// pass each department to createTiles()
// display to screen
function displayData() {
    gridTile.style.display = 'grid';
    let tiles = '';
    for (let key in sortedDepAndJobs) {
        tiles += createTile(sortedDepAndJobs[key]);
    }
    gridTile.innerHTML = tiles;
}

// create tiles from department
// object passed through and 
// create string of html
function createTile(department) {
    let output = `<div class="grid-tile">
    <h3>${department.department}</h3>
    <div class="jobListing jobListing-header"><span>Job Title</span><span>Location</span></div>
    `;
    let baseUrl = "https://jobs.smartrecruiters.com/Cricut/";
    for (let i = 0; i < department.jobs.length; i++) {
        if (department.jobs.length !== 0) {
            let applyUrl = baseUrl + department.jobs[i].id;
            output += `<a href="${applyUrl}" target="_blank" class="jobListing">
            <span>${department.jobs[i].name} </span> <span>${department.jobs[i].location.city} ${department.jobs[i].location.region}</span>
                </a>
                `;
        } else {
            return;
        }
    }
    output += '</div>';
    return output;
}

function removeSpinner() {
    document.querySelector('.cr-loading-spinner').style.display = 'none';
}