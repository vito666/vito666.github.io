var canvas, canvasContext;

var blackCar = new carClass(),
    redCar = new carClass();


window.onload = () => {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    colorRect(0, 0, canvas.width, canvas.height, "#zzz");
    colorText("LOADING IMAGES", canvas.width / 2, canvas.height / 2, "white");

    loadImages();
};


function imageLoadingDoneSoStartGame() {
    var framesPerSecond = 30;
    setInterval(updateAll, 1000 / framesPerSecond);

    setupInput();

    loadLevel(levelOne);
}

function loadLevel(whichLevel) {
    trackGrid = whichLevel.slice()
    redCar.reset(otherCarPic, "Red machine");
    blackCar.reset(carPic, "Bimer");
}

function updateAll() {
    moveAll();
    drawAll();
}

function moveAll() {
    redCar.move();
    blackCar.move();
}

//function clearScreen() {
//    colorRect(0, 0, canvas.width, canvas.height, 'black');
//}

function drawAll() {
    //    clearScreen();

    drawTracks();
    redCar.draw();
    blackCar.draw();
}