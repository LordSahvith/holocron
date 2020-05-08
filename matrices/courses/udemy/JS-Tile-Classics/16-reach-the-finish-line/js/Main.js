var canvas, canvasContext;

var blueCar = new carClass();
var greenCar = new carClass();

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    colorRect(0, 0, canvas.width, canvas.height, "black");
    colorText("LOADING IMAGES", canvas.width / 2 - 50, canvas.height / 2, "white");

    loadImages();
}

function imageLoadingDoneSoStartGame() {
    var framesPerSecond = 30;
    setInterval(updateAll, 1000 / framesPerSecond);

    setupInput();
    loadLevel(trackList[currentLevel]);
}

function loadLevel(whichLevel) {
    trackGrid  = [...whichLevel];
    blueCar.reset(carPic, "Blue Lightening");
    greenCar.reset(carPic2, "Green Bud");
}

function updateAll() {
    moveAll();
    drawAll();
}

function moveAll() {
    blueCar.move();
    greenCar.move();
}

function drawAll() {
    drawTracks();
    blueCar.draw();
    greenCar.draw();
}