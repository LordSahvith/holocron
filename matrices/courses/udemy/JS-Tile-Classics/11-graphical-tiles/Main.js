var canvas, canvasContext;

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 60;
    setInterval(updateAll, 1000 / framesPerSecond);

    setupInput();

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

function clerScreen() {
    colorRect(0, 0, canvas.width, canvas.height, 'black'); 
}

function drawAll() {
    clerScreen();
    carDraw();
    drawTracks();
}