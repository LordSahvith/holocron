const ENDPOINT_PEOPLE = 'https://swapi.co/api/people/';
const ENDPOINT_STARSHIPS = 'https://swapi.co/api/starships/';

const jobs = [];
const sortedJobs = [];
const sortedDepartments = [];
const sortedDepAndJobs = [];
const gridTile = document.querySelector('.grid-tile-container');

fetch(ENDPOINT_PEOPLE)
    .then(blob => blob.json())
    .then(data => console.log(data));

fetch(ENDPOINT_STARSHIPS)
    .then(blob => blob.json())
    .then(data => console.log(data));