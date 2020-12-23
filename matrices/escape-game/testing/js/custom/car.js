console.group('Game Car Library');
console.log('compilation started...');

let carPic = document.createElement('img');
let carPicLoaded = false;

let canvas;
let canvastContext;

const GROUNDSPEED_FRICTION = 0.94;
const GAS_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.03;

let car = {
    x: {
        pos: 75,
        speed: 5
    },
    y: {
        pos: 75,
        speed: 7
    },
    ang: 0,
    speed: 0
};

function carImageLoad() {
    carPic.onload = function () {
        carPicLoaded = true;
    };

    carPic.src = 'img/player1car.png';
}

function carReset() {
    let track = currentLevelInfo.track;

    for (let row = 0; row < getRowCount(); row++) {
        for (let col = 0; col < getColCount(); col++) {
            let trackNumber = getRowColLayoutIndex(col, row);
            if (track.layout[trackNumber] === TRACK_PLAYERSTART) {
                track.layout[trackNumber] = TRACK_ROAD;
                car.ang = -Math.PI / 2;
                car.x.pos = (col * track.width) + (track.width / 2);
                car.y.pos = (row * track.height) + (track.height / 2);
            }
        }
    }
}

function drawCar() {
    if (carPicLoaded) {
        drawBitMapCenteredWithRotation(carPic, car.x.pos, car.y.pos, car.ang);
    }
}

function moveCar() {
    car.speed *= GROUNDSPEED_FRICTION;

    if (keyHeld_Gas) {
        car.speed += GAS_POWER;
    }

    if (keyHeld_Reverse) {
        car.speed -= REVERSE_POWER;
    }

    if (keyHeld_TurnLeft) {
        car.ang -= TURN_RATE;
    }

    if (keyHeld_TurnRight) {
        car.ang += TURN_RATE;
    }

    car.x.pos += Math.cos(car.ang) * car.speed;
    car.y.pos += Math.sin(car.ang) * car.speed;
    setCarBoundries();
}

function setCarBoundries() {
    // set left
    if (car.x.pos < 0 && car.x.speed < 0.0) {
        car.x.speed *= -1;
    }
    // set right
    if (car.x.pos > canvas.width && car.x.speed > 0.0) {
        car.x.speed *= -1;
    }
    // set top
    if (car.y.pos < 0 && car.y.speed < 0.0) {
        car.y.speed *= -1;
    }
    // set bottom
    if (car.y.pos > canvas.height) {
        carReset();
    }
}

console.log('Game Car Library sucessful.');
console.groupEnd();