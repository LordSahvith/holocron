const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 10;
        this.weight = 2;
        this.directionX = -2;
    }

    update() {
        if (this.y > canvas.height) {
            this.y = 0 - this.size;
            this.weight = 2;
            this.x = Math.random() * canvas.width;
        }
        this.weight += 0.01;
        this.y += this.weight;
        this.x += this.directionX;
    }

    draw() {
        ctx.fillStyle = '#ff0000';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();
    }
}

const particle1 = new Particle(400, 80);
const particle2 = new Particle(100, 10);

function animate() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.01)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particle1.update();
    particle1.draw();
    particle2.update();
    particle2.draw();

    requestAnimationFrame(animate);
}

animate();