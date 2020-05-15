var canvas, canvasContext;

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 60;
    setInterval(updateAll, 1000 / framesPerSecond);

    setupInput();

    trackImagesLoad();
    carImageLoad();

    carReset();
}

function updateAll() {
    moveAll();
    drawAll();
}

function moveAll() {
    moveCar();
    carTrackCHandling();
}

function drawAll() {
    drawTracks();
    carDraw();
}