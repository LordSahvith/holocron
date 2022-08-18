const canvas = document.querySelector('#myCanvas');
const context = canvas.getContext('2d');

// black background
context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

let particles = {};
let particleIndex = 0;
let settings = {
    density: 20,
    particleSize: 10,
    startingX: Math.random() * 400,
    startingY: canvas.clientHeight / 4,
    gravity: 0.5,
    maxLife: 100,
    groundLevel: canvas.clientHeight,
    leftWall: 0,
    rightWall: canvas.clientWidth
};

function Particle() {
    // starting postitions
    this.posX = Math.random() * 600;
    this.posY = Math.random() * 200;

    // random x and y velocities
    this.velX = Math.random() * 20 - 10;
    this.velY = Math.random() * 20 - 5;

    this.particleSize = Math.random() * 10;

    // add particle 
    particleIndex++;
    particles[particleIndex] = this;
    this.id = particleIndex;
    this.life = 0;
}

Particle.prototype.draw = function() {
    this.posX += this.velX;
    this.posY += this.velY;

    // bounce off the ground
    if ((this.posY + this.particleSize) > settings.groundLevel) {
        this.velY *= -0.6;
        this.velX *= 0.75;
        this.posY = settings.groundLevel - this.particleSize;
    }

    // determine whether to bounce particle off wall
    if (this.posX - (this.particleSize) <= settings.leftWall) {
        this.velX *= -1;
        this.posX = settings.leftWall + (this.particleSize);
    }

    if (this.posX + (this.particleSize) >= settings.rightWall) {
        this.velX *= -1;
        this.posX = settings.rightWall - this.particleSize;
    }

    // adjust for gravity
    this.velY += settings.gravity;

    // age particle
    this.life++;

    // if Particle is old, remove it
    if (this.life > settings.maxLife) {
        delete particles[this.id];
    }

    // create the shape
    context.clearRect(settings.leftWall, settings.groundLevel, canvas.clientWidth, canvas.clientHeight);
    context.beginPath();
    context.fillStyle = 'white';
    context.arc(this.posX, this.posY, this.particleSize, 0, Math.PI*2, true);
    context.closePath();
    context.fill();
};

setInterval(function() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    
    // draw particles
    for (let i = 0; i < settings.density; i++) {
        if (Math.random() > 0.97) {
            // introducing random chance of creating a particle
            // corresponding to a chance of 1 per second
            new Particle();
        }
    }

    for (let i in particles) {
        particles[i].draw();
    }
}, 30);