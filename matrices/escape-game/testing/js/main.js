'use strict';
console.groupCollapsed('Game Parameters');
console.log('setting game parameters...');

let currentLevel = 'level1';
let currentLevelInfo = levelInfo[currentLevel];

let myInterval;


/********************************
 * START: BASE ENGINE FUNCTIONS *
*********************************/

window.onload = function () {
    canvas = document.querySelector('#gameCanvas');
    canvastContext = canvas.getContext('2d');
    init();
};

function init() {
    addEventListeners();
    carReset();
    handleInterval();
}

function handleInterval() {
    if (myInterval) {
        clearInterval(myInterval);
    }
    let framesPerSecond = 30;
    myInterval = setInterval(updateScreen, 1000 / framesPerSecond);
}

/******************************
 * END: BASE ENGINE FUNCTIONS *
*******************************/


/*****************************
 * START: GAME SPECIFIC CODE *
 * ADD YOUR CUSTOM CODE HERE *
******************************/

function updateScreen() {
    drawObjects();
    loadImages();
    objectCollisions();
    movingObjects();

    // colRowDebug();
}

function drawObjects() {
    drawCanvas();
    drawTracks();
    drawCar();
}

function loadImages() {
    trackImageLoad();
    carImageLoad();
}

function objectCollisions() {
    wallCollision();
}

function movingObjects() {
    moveCar();
}

function gameOver() {
    handleInterval();
    currentLevelInfo.track.layout = [...layout1];
    init();
}

/***************************
 * END: GAME SPECIFIC CODE *
****************************/


/**************************
 * START: GAME DEBUG CODE *
***************************/

function colRowDebug() {
    let trackCol = Math.floor(mouse.x / currentLevelInfo.track.width);
    let trackRow = Math.floor(mouse.y / currentLevelInfo.track.height);

    let trackUnderMouse = getRowColLayoutIndex(trackCol, trackRow);
    drawText(`${trackCol},${trackRow}:${trackUnderMouse}`, mouse.x, mouse.y, 'yellow');

    // removeIndexUnderMouse();
}

function removeIndexUnderMouse() {
    if (trackCol >= 0 && trackCol < getColCount() &&
        trackRow >= 0 && trackRow < getRowCount()) {
        currentLevelInfo.track.layout[trackUnderMouse] = 0;
    }
}

function setPlayerObjectOnMouse() {
    car.x.pos = mouse.x;
    car.y.pos = mouse.y;
    car.x.speed = 4;
    car.y.speed = -4;
}

/************************
 * END: GAME DEBUG CODE *
*************************/

console.log('game parameters set');
console.groupEnd();