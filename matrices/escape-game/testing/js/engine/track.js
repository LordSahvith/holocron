console.groupCollapsed('Track Library');
console.log('compilation started...');

let trackRoadPic = document.createElement('img');
let trackWallPic = document.createElement('img');
let trackRoadPicLoaded = false;
let trackWallPicLoaded = false;

const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;

let layout1 = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
];

let levelInfo = {
    level1: {
        track: {
            width: 40,
            height: 40,
            gap: 2,
            gutter: 0,
            layout: [...layout1]
        }
    }
};

console.groupCollapsed('Load Images');
console.log('compilation started...');
function trackImageLoad() {
    trackRoadPic.onload = function () {
        trackRoadPicLoaded = true;
    };

    let trackRoadImg = 'img/racing/track_road.png';
    let trackWallImg = 'img/racing/track_wall.png';

    trackRoadPic.src = trackRoadImg;
    trackWallPic.src = trackWallImg;
}
console.log('compilation successful.');
console.groupEnd();

function drawTracks() {
    let track = currentLevelInfo.track;

    for (let row = 0; row < getRowCount(); row++) {
        for (let col = 0; col < getColCount(); col++) {

            let trackNumber = getRowColLayoutIndex(col, row);

            if (track.layout[trackNumber] === TRACK_ROAD) {
                canvastContext.drawImage(trackRoadPic, track.width * col, track.height * row);
            } else if (track.layout[trackNumber] === TRACK_WALL) {
                canvastContext.drawImage(trackWallPic, track.width * col, track.height * row);
            } 
        }
    }
}

function wallCollision() {
    let carTrackCol = Math.floor(car.x.pos / currentLevelInfo.track.width);
    let carTrackRow = Math.floor(car.y.pos / currentLevelInfo.track.height);

    if (carTrackCol >= 0 && carTrackCol < getColCount() &&
        carTrackRow >= 0 && carTrackRow < getRowCount()) {
        if (isWallAtColRow(carTrackCol, carTrackRow)) {
            car.x.pos -= Math.cos(car.ang) * car.speed;
            car.y.pos -= Math.sin(car.ang) * car.speed;
            car.speed *= -0.5;
        }
    }
}

function isWallAtColRow(col, row) {
    let trackUnderCoord = getRowColLayoutIndex(col, row);
    return currentLevelInfo.track.layout[trackUnderCoord] === TRACK_WALL;
}

// TODO: update to use layout/map vs canvas width
function getRowCount() {
    return (currentLevelInfo.track.layout.length * currentLevelInfo.track.width) / canvas.width;
}

// TODO: update to use layout/map vs canvas width
function getColCount() {
    return currentLevelInfo.track.layout.length / getRowCount();
}

function getRowColLayoutIndex(col, row) {
    return col + getColCount() * row;
}

console.log('compilation successful.');
console.groupEnd();