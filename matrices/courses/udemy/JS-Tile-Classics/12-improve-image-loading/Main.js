var canvas, canvasContext;

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    colorRect(0, 0, canvas.width, canvas.height, "black");
    colorText("LOADING IMAGES", canvas.width / 2, canvas,hegiht / 2, "white");

    loadImages();
}

function imageLoadingDoneSoStartGame() {
    var framesPerSecond = 60;
    setInterval(updateAll, 1000 / framesPerSecond);

    setupInput();
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