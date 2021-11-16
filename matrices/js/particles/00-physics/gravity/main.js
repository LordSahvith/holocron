const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

// create particle
class Particle {
    constructor(x, y, speedX, speedY, size, color) {
        this.x = {
            pos: x,
            speed: speedX
        };
        this.y = {
            pos: y,
            speed: speedY
        };
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x.pos, this.y.pos, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        // check if particle is still within canvas
        if (this.x.pos > canvas.width || this.x.pos < 0) {
            this.x.speed = -this.x.speed;
        }
        if (this.y.pos > canvas.height || this.y.pos < 0) {
            this.y.speed = -this.y.speed;
        }

        this.x.pos += this.x.speed;
        this.y.pos += this.y.speed;
        this.draw();        
    }
}

// check if particles are lcose enough to draw line between them
function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x.pos - particlesArray[b].x.pos) * (particlesArray[a].x.pos - particlesArray[b].x.pos)) +
                ((particlesArray[a].y.pos - particlesArray[b].y.pos) * (particlesArray[a].y.pos - particlesArray[b].y.pos));

            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacityValue = 1 - (distance / 20000);
                ctx.strokeStyle = `rgba(255, 0, 0, ${opacityValue})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x.pos, particlesArray[a].y.pos);
                ctx.lineTo(particlesArray[b].x.pos, particlesArray[b].y.pos);
                ctx.stroke();
            }
        }
    }
}

// check if particles are lcose enough to draw line between them
function gravity() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x.pos - particlesArray[b].x.pos) * (particlesArray[a].x.pos - particlesArray[b].x.pos)) +
                ((particlesArray[a].y.pos - particlesArray[b].y.pos) * (particlesArray[a].y.pos - particlesArray[b].y.pos));

            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                if (particlesArray[a].size > particlesArray[b].size) {
                    particlesArray[b].x.speed = -particlesArray[b].x.speed;
                    particlesArray[b].y.speed = -particlesArray[b].y.speed;
                    particlesArray[b].update();
                } else {
                    particlesArray[a].x.speed = -particlesArray[a].x.speed;
                    particlesArray[a].y.speed = -particlesArray[a].y.speed;
                    particlesArray[a].update();
                }
            }
        }
    }
}

// create particle array
function init() {
    particlesArray = [];
    // let numberOfParticles = (canvas.width * canvas.height) / 9000;
    let numberOfParticles = 15;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let speedX = (Math.random() * 5) - 2.5;
        let speedY = (Math.random() * 5) - 2.5;
        let color = 'rgb(255, 0, 0)';

        particlesArray.push(new Particle(x, y, speedX, speedY, size, color));
    }
}

// animate particles
function animate() {
    requestAnimationFrame(animate);
    // ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }

    gravity();
    connect();
}

init();
animate();