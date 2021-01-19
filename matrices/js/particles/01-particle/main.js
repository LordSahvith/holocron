const canvas = document.querySelector('#myCanvas');
const context = canvas.getContext('2d');

// black background
context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

// square particle
context.fillStyle = 'white';
context.fillRect(300, 200, 10, 10);

// round particle
context.beginPath();
context.fillStyle = 'white';
context.arc(500, 200, 10, 0, Math.PI*2, true);
context.closePath();
context.fill();

let posX = 20;
let posY = 100;

setInterval(function() {
    posX += 1;
    posY += 0.25;

    context.beginPath();
    context.fillStyle = 'white';
    context.arc(posX, posY, 10, 0, Math.PI*2, true);
    context.closePath();
    context.fill();
}, 30);