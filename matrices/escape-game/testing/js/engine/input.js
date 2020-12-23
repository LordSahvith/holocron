console.groupCollapsed('Input Library');
console.log('compilation started...');

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

let keyHeld_Gas = false;
let keyHeld_Reverse = false;
let keyHeld_TurnLeft = false;
let keyHeld_TurnRight = false;

let mouse = {
    x: 0,
    y: 0
};

function updateMousePos(e) {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;

    mouse.x = e.clientX - rect.left - root.scrollLeft;
    mouse.y = e.clientY - rect.top - root.scrollTop;
}

function keyPressed(e) {
    // console.log('Key Press:', e.keyCode);
    e.preventDefault();

    if (e.keyCode === KEY_A) {
        keyHeld_TurnLeft = true;
    }

    if (e.keyCode === KEY_D) {
        keyHeld_TurnRight = true;
    }

    if (e.keyCode === KEY_W) {
        keyHeld_Gas = true;
    }

    if (e.keyCode === KEY_S) {
        keyHeld_Reverse = true;
    }
}

function keyReleased(e) {
    // console.log('Key Release:', e.keyCode);
    e.preventDefault();

    if (e.keyCode === KEY_A) {
        keyHeld_TurnLeft = false;
    }

    if (e.keyCode === KEY_D) {
        keyHeld_TurnRight = false;
    }

    if (e.keyCode === KEY_W) {
        keyHeld_Gas = false;
    }

    if (e.keyCode === KEY_S) {
        keyHeld_Reverse = false;
    }
}

function addEventListeners() {
    canvas.addEventListener('mousemove', updateMousePos);
    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);
}

console.log('compilation successful.');
console.groupEnd();