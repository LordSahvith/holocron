const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

// get mouse position
let mouse = {
    x: undefined,
    y: undefined,
    radius: (canvas.height / 80) * (canvas.width / 80)
}

window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

window.addEventListener('click',
    function (event) {
        explode();
    }
);

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
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = 'rgb(255, 0, 0)';
        ctx.fill();
    }

    // check particle postion, check mouse position, move the particle, draw the particle
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

    mouseCollision() {
        // check collision detection - mouse postion / particle postion
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
            }
        }
    }

    vacuumEffect() {
        // check collision detection - mouse postion / particle postion
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x -= 10;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x += 10;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y -= 10;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y += 10;
            }

            // if (mouse.x < this.x && this.x < canvas.width - this.size * 5) {
            //     this.x -= 5;
            // }
            // if (mouse.x > this.x && this.x > this.size * 5) {
            //     this.x += 5;
            // }
            // if (mouse.y < this.y && this.y < canvas.height - this.size * 5) {
            //     this.y -= 5;
            // }
            // if (mouse.y > this.y && this.y > this.size * 5) {
            //     this.y += 5;
            // }
        }
    }
}

// check if particles are lcose enough to draw line between them
function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacityValue = 1 - (distance / 20000);
                ctx.strokeStyle = `rgba(255, 0, 0, ${opacityValue})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// move particles away from mouse
function explode() {
    // console.log(mouse.x, mouse.y);
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - mouse.x) * (particlesArray[a].x - mouse.x)) +
                ((particlesArray[a].y - mouse.y) * (particlesArray[a].y - mouse.y));

            if (distance <= 10) {
                particlesArray[a].x += mouse.radius + this.size;
                particlesArray[a].y += mouse.radius + this.size;
            }
        }
    }
}

// create particle array
function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 8000;
    for (let i = 0; i < numberOfParticles * 2; i++) {
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = 'rgb(255, 0, 0)';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }

    connect();
}

// resize event
window.addEventListener('resize',
    function () {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mouse.radius = ((canvas.height / 80) * (canvas.width / 80));
        init();
    }
);

// mouse out event
window.addEventListener('mouseout',
    function () {
        mouse.x = undefined;
        mouse.y = undefined;
    }
);

init();
animate();
