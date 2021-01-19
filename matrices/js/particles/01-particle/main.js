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