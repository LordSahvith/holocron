const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

var keyHeld_Gas = false;
var keyHeld_Reverse = false;
var keyHeld_TurnLeft = false;
var keyHeld_TurnRight = false;

var mouseX = 0;
var mouseY = 0;

function setupInput() {
    canvas.addEventListener('mousemove', updateMousePos);

    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);
}

function updateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;
}

function keyPressed(evt) {
    // evt.preventDefault();
    let key = evt.which || evt.keycode;

    if (key == KEY_LEFT_ARROW) {
        keyHeld_TurnLeft = true;
    }

    if (key == KEY_RIGHT_ARROW) {
        keyHeld_TurnRight = true;
    }

    if (key == KEY_UP_ARROW) {
        keyHeld_Gas = true;
    }

    if (key == KEY_DOWN_ARROW) {
        keyHeld_Reverse = true;
    }
}

function keyReleased(evt) {
    // evt.preventDefault();
    let key = evt.which || evt.keycode;

    if (key == KEY_LEFT_ARROW) {
        keyHeld_TurnLeft = false;
    }

    if (key == KEY_RIGHT_ARROW) {
        keyHeld_TurnRight = false;
    }

    if (key == KEY_UP_ARROW) {
        keyHeld_Gas = false;
    }

    if (key == KEY_DOWN_ARROW) {
        keyHeld_Reverse = false;
    }
}