var carPic = document.createElement('img');
var trackPics = [];
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
}

function loadImageForTrackCode(trackCode, fileName) {
    trackPics[trackCode] = document.createElement("img");
    beginLoadingImage(trackPics[trackCode], fileName);
}

function loadImages() {
    var imageList = [
        {varName: carPic, theFile: "images/player1car.png"},
        {trackType: TRACK_ROAD, theFile: "images/track_road.png"},
        {trackType: TRACK_WALL, theFile: "images/track_wall.png"},
        {trackType: TRACK_GOAL, theFile: "images/track_goal.png"},
        {trackType: TRACK_TREES, theFile: "images/track_trees.png"},
        {trackType: TRACK_FLAG, theFile: "images/track_flag.png"}
    ];

    picsToLoad = imageList.length;
    
    for (var i = 0; i < imageList.length; i++) {
        if (imageList[i].varName != undefined) {
            beginLoadingImage(imageList[i].varName, imageList[i].theFile);
        } else {
            loadImageForTrackCode(imageList[i].trackType, imageList[i].theFile);
        }
    }
}