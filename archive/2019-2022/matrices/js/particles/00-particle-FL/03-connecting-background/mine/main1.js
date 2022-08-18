const canvas1 = document.querySelector('#canvas2');
const ctx1 = canvas1.getContext('2d');
canvas1.width = window.innerWidth;
canvas1.height = window.innerHeight;

let particlesArray1;

// get mouse1 position
let mouse1 = {
    x: undefined,
    y: undefined,
    radius: (canvas1.height / 80) * (canvas1.width / 80)
}

window.addEventListener('mousemove',
    function (event) {
        mouse1.x = event.x;
        mouse1.y = event.y;
    }
);

window.addEventListener('click',
    function (event) {
        explode();
    }
);

// create particle
class Particle1 {
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
        // check if particel is still within canvas1
        if (this.x > canvas1.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas1.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // this.mouseCollision();
        // this.vacuumEffect();

        this.x += this.directionX;
        this.y += this.directionY;
        // draw particle
        this.draw();
    }

    mouseCollision() {
        // check collision detection - mouse1 postion / particle postion
        let dx = mouse1.x - this.x;
        let dy = mouse1.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse1.radius + this.size) {
            if (mouse1.x < this.x && this.x < canvas1.width - this.size * 10) {
                this.x += 10;
            }
            if (mouse1.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }
            if (mouse1.y < this.y && this.y < canvas1.height - this.size * 10) {
                this.y += 10;
            }
            if (mouse1.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
            }
        }
    }

    vacuumEffect() {
        // check collision detection - mouse1 postion / particle postion
        let dx = mouse1.x - this.x;
        let dy = mouse1.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse1.radius + this.size) {
            if (mouse1.x < this.x && this.x < canvas1.width - this.size * 10) {
                this.x -= 10;
            }
            if (mouse1.x > this.x && this.x > this.size * 10) {
                this.x += 10;
            }
            if (mouse1.y < this.y && this.y < canvas1.height - this.size * 10) {
                this.y -= 10;
            }
            if (mouse1.y > this.y && this.y > this.size * 10) {
                this.y += 10;
            }

            // if (mouse1.x < this.x && this.x < canvas1.width - this.size * 5) {
            //     this.x -= 5;
            // }
            // if (mouse1.x > this.x && this.x > this.size * 5) {
            //     this.x += 5;
            // }
            // if (mouse1.y < this.y && this.y < canvas1.height - this.size * 5) {
            //     this.y -= 5;
            // }
            // if (mouse1.y > this.y && this.y > this.size * 5) {
            //     this.y += 5;
            // }
        }
    }
}

// check if particles are lcose enough to draw line between them
function connect1() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray1.length; a++) {
        for (let b = a; b < particlesArray1.length; b++) {
            let distance = ((particlesArray1[a].x - particlesArray1[b].x) * (particlesArray1[a].x - particlesArray1[b].x)) +
                ((particlesArray1[a].y - particlesArray1[b].y) * (particlesArray1[a].y - particlesArray1[b].y));

            if (distance < (canvas1.width / 7) * (canvas1.height / 7)) {
                opacityValue = 1 - (distance / 20000);
                ctx1.strokeStyle = `rgba(255, 0, 255, ${opacityValue})`;
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
function init1() {
    particlesArray1 = [];
    let numberOfParticles = (canvas1.height * canvas1.width) / 6000;
    for (let i = 0; i < numberOfParticles * 2; i++) {
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = 'rgb(255, 0, 255)';

        particlesArray1.push(new Particle1(x, y, directionX, directionY, size, color));
    }
}

// animation loop
function animate1() {
    requestAnimationFrame(animate1);
    ctx1.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray1.length; i++) {
        particlesArray1[i].update();
    }

    connect1();
}

init1();
animate1();
