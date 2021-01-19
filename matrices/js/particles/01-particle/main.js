const canvas = document.querySelector('#myCanvas');
const context = canvas.getContext('2d');

// black background
context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

let posX = 20;
let posY = 100;
let velX = 10;
let velY = -10;
let gravity = 1;

setInterval(function() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    posX += velX;
    posY += velY;
    velY += gravity;

    context.beginPath();
    context.fillStyle = 'white';
    context.arc(posX, posY, 10, 0, Math.PI*2, true);
    context.closePath();
    context.fill();
}, 30);