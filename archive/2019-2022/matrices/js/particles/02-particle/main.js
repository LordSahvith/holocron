const canvas = document.querySelector('#myCanvas');
const context = canvas.getContext('2d');

let particles = {};
let particleIndex = 0;
let particleNum = 30;

// black background
context.fillRect(0, 0, canvas.width, canvas.height);

function Particle() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.vx = Math.random() * 10 - 5;
    this.vy = Math.random() * 10 - 5;    
    this.gravity = 0.5;
    particleIndex++;
    particles[particleIndex] = this;
    this.id = particleIndex;
    this.life = 0;
    this.maxLife = Math.random() * 30 + 50;
    this.color = `hsla(${parseInt(Math.random() * 255, 10)}, 100%, 50%, 0.3)`
}

Particle.prototype.draw = function() {
    this.x += this.vx;
    this.y += this.vy;

    if (Math.random() < 0.1) {
        this.vx = Math.random() * 10 - 5;
        this.vy = Math.random() * 10 - 5;
    }

    // this.vy += this.gravity;
    this.life++;

    if (this.life >= this.maxLife) {
        delete particles[this.id];
    }

    context.beginPath();
    context.fillStyle = this.color;  
    context.arc(this.x, this.y, 10, 0, Math.PI*2, true);
    context.closePath();
    context.fill();
};

setInterval(function() {
    context.globalCompositeOperation = 'source-over';
    context.fillStyle = 'rgba(0, 0, 0, 0.2)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particleNum; i++) {
        new Particle();
    }

    context.globalCompositeOperation = 'lighter';

    for (let i in particles) {
        particles[i].draw();
    }
}, 30);
