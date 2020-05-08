const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

var mouseX = 0;
var mouseY = 0;

function setupInput() {
    canvas.addEventListener('mousemove', updateMousePos);

    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);

    blueCar.setupInput(KEY_W, KEY_D, KEY_S, KEY_A);
    greenCar.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
}

function updateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;
}

function keySet(keyEvt, whichCar, setTo) {
    let key = keyEvt.which || keyEvt.keycode;

    if (key == whichCar.controlKeyLeft) {
        whichCar.keyHeld_TurnLeft = setTo;
    }

    if (key == whichCar.controlKeyRight) {
            whichCar.keyHeld_TurnRight = setTo;
    }

    if (key == whichCar.controlKeyUp) {
            whichCar.keyHeld_Gas = setTo;
    }

    if (key == whichCar.controlKeyDown) {
            whichCar.keyHeld_Reverse = setTo;
    }
}

function keyPressed(evt) {
    // evt.preventDefault();
    keySet(evt, blueCar, true);
    keySet(evt, greenCar, true);
}

function keyReleased(evt) {
    // evt.preventDefault();
    keySet(evt, blueCar, false);
    keySet(evt, greenCar, false);
}