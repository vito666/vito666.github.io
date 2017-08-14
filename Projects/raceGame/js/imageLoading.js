var carPic = document.createElement("img"),
    otherCarPic = document.createElement("img"),
    trackPics = [];

var picsToLoad = 0; // set automatically based on imageList in loadImages()

function countLoadedImagesAndLaunchIfReady() { // change name
    picsToLoad--;
    if (picsToLoad == 0) {
        imageLoadingDoneSoStartGame();
    }
}

function beginLoadingImage(imgVar, fileName) {
    imgVar.onload = countLoadedImagesAndLaunchIfReady;
    imgVar.src = `img/${fileName}`;
}

function loadImageForTrackCode(trackCode, fileName) {
    trackPics[trackCode] = document.createElement("img");
    beginLoadingImage(trackPics[trackCode], fileName);
}

function loadImages() {
    var imageList = [
        {
            varName: carPic,
            theFile: "car.png"
        },
        {
            varName: otherCarPic,
            theFile: "car2.png"
        },
        {
            trackType: TRACK_ROAD,
            theFile: "road.png"
        },
        {
            trackType: TRACK_WALL,
            theFile: "wall.png"
        },
        {
            trackType: TRACK_TREE,
            theFile: "tree.png"
        },
        {
            trackType: TRACK_FLAG,
            theFile: "flag.png"
        },
        {
            trackType: TRACK_FINISH,
            theFile: "finish.png"
        }
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