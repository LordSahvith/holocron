const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

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

    if (key == KEY_LEFT_ARROW ||
        key == KEY_A) {
        keyHeld_TurnLeft = true;
    }

    if (key == KEY_RIGHT_ARROW ||
        key == KEY_D) {
        keyHeld_TurnRight = true;
    }

    if (key == KEY_UP_ARROW ||
        key == KEY_W) {
        keyHeld_Gas = true;
    }

    if (key == KEY_DOWN_ARROW ||
        key == KEY_S) {
        keyHeld_Reverse = true;
    }
}

function keyReleased(evt) {
    // evt.preventDefault();
    let key = evt.which || evt.keycode;

    if (key == KEY_LEFT_ARROW ||
        key == KEY_A) {
        keyHeld_TurnLeft = false;
    }

    if (key == KEY_RIGHT_ARROW ||
        key == KEY_D) {
        keyHeld_TurnRight = false;
    }

    if (key == KEY_UP_ARROW ||
        key == KEY_W) {
        keyHeld_Gas = false;
    }

    if (key == KEY_DOWN_ARROW ||
        key == KEY_S) {
        keyHeld_Reverse = false;
    }
}