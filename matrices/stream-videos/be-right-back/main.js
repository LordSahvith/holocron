const canvas = document.querySelector('#canvas1');
const ctx1 = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray1;

// create particle
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    // method to draw individual particle
    draw() {
        ctx1.beginPath();
        ctx1.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx1.fillStyle = this.color;
        ctx1.fill();
    }

    // check particle postion, check mouse1 position, move the particle, draw the particle
    update() {
        // check if particel is still within canvas
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // this.mouseCollision();
        // this.vacuumEffect();

        this.x += this.directionX;
        this.y += this.directionY;
        // draw particle
        this.draw();
    }
}

// check if particles are lcose enough to draw line between them
function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray1.length; a++) {
        for (let b = a; b < particlesArray1.length; b++) {
            let distance = ((particlesArray1[a].x - particlesArray1[b].x) * (particlesArray1[a].x - particlesArray1[b].x)) +
                ((particlesArray1[a].y - particlesArray1[b].y) * (particlesArray1[a].y - particlesArray1[b].y));

            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacityValue = 1 - (distance / 20000);
                ctx1.strokeStyle = `rgba(207, 0, 0, ${opacityValue})`;
                ctx1.lineWidth = 1;
                ctx1.beginPath();
                ctx1.moveTo(particlesArray1[a].x, particlesArray1[a].y);
                ctx1.lineTo(particlesArray1[b].x, particlesArray1[b].y);
                ctx1.stroke();
            }
        }
    }
}

// move particles away from mouse1
function explode() {
    // console.log(mouse1.x, mouse1.y);
    for (let a = 0; a < particlesArray1.length; a++) {
        for (let b = a; b < particlesArray1.length; b++) {
            let distance = ((particlesArray1[a].x - mouse1.x) * (particlesArray1[a].x - mouse1.x)) +
                ((particlesArray1[a].y - mouse1.y) * (particlesArray1[a].y - mouse1.y));

            if (distance <= 10) {
                particlesArray1[a].x += mouse1.radius + this.size;
                particlesArray1[a].y += mouse1.radius + this.size;
            }
        }
    }
}

// create particle array
function init() {
    particlesArray1 = [];
    let numberOfParticles = (canvas.height * canvas.width) / 6000;
    for (let i = 0; i < numberOfParticles * 2; i++) {
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = 'rgb(207, 0, 0)';

        particlesArray1.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx1.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray1.length; i++) {
        particlesArray1[i].update();
    }

    connect();
}

// resize event
window.addEventListener('resize',
    function () {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        init();
    }
);

init();
animate();
