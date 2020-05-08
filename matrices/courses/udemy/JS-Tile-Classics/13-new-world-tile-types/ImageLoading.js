var roadPic = document.createElement('img');
var wallPic = document.createElement('img');
var carPic = document.createElement('img');

var picsToLoad = 0;

function countLoadedImagesAndLaunchIfReady() {
    picsToLoad--;
    if (picsToLoad == 0) {
        imageLoadingDoneSoStartGame();
    }
}

function beginLoadingImage(imgVar, fileName) {
    imgVar.onload = countLoadedImagesAndLaunchIfReady();
    imgVar.src = fileName;
}arImageLoad() {
}

function loadImages() {
    var imageList = [
        {varName: roadPic, theFile: "images/track_road.png"},
        {varName: wallPic, theFile: "images/track_wall.png"},
        {varName: carPic, theFile: "images/player1car.png"}
    ];

    picsToLoad = imageList.length;
    
    for (var i = 0; i < imageList.length; i++) {
        beginLoadingImage(imageList[i].varName, imageList[i].theFile);
    }
}