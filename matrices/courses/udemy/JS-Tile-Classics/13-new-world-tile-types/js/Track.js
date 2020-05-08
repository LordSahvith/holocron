const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_GAP = 2;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;
var trackGrid = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 4, 0, 0, 1, 0, 0, 4, 0, 0, 1, 0, 0, 4, 0, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 4, 1,
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 4, 0, 0, 1, 0, 0, 4, 0, 0, 1, 4, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1,
    1, 0, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1,
    1, 1, 5, 4, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 4, 0, 0, 4, 1,
    1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
];
const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;
const TRACK_GOAL = 3;
const TRACK_TREES = 4;
const TRACK_FLAG = 5;

function isObstacleAtColRow(col, row) {
    if (col >= 0 && col < TRACK_COLS &&
        row >= 0 && row < TRACK_ROWS) {
        var trackIndexUnderCoord = rowColToArrayIndex(col, row);
        // this can be used to modify to allow for short cuts
        return trackGrid[trackIndexUnderCoord] != TRACK_ROAD;
    } else {
        return false;
    }
}

function carTrackCHandling() {
    var carTrackCol = Math.floor(carX / TRACK_W);
    var carTrackRow = Math.floor(carY / TRACK_H);

    if (carTrackCol >= 0 && carTrackCol < TRACK_COLS &&
        carTrackRow >= 0 && carTrackRow < TRACK_ROWS) {

        if (isObstacleAtColRow(carTrackCol, carTrackRow)) {
            carX -= Math.cos(carAng) * carSpeed;
            carY -= Math.sin(carAng) * carSpeed;

            carSpeed *= -0.5;
        }
    }
}

function rowColToArrayIndex(col, row) {
    return col + TRACK_COLS * row;
}

function drawTracks() {
    for (var eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
        for (var eachCol = 0; eachCol < TRACK_COLS; eachCol++) {

            var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
            var tileKindHere = trackGrid[arrayIndex];
            var varImg;

            switch (tileKindHere) {
                case TRACK_ROAD:
                    varImg = roadPic;
                    break;
                case TRACK_WALL:
                    varImg = wallPic;
                    break;
                case TRACK_GOAL:
                    varImg = goalPic;
                    break;
                case TRACK_TREES:
                    varImg = treesPic;
                    break;
                case TRACK_FLAG:
                    varImg = flagPic;
                    break;
            }
            canvasContext.drawImage(varImg, TRACK_W * eachCol, TRACK_H * eachRow);
        }
    }
}