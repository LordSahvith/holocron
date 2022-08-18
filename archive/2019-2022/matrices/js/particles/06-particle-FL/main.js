window.onload = function () {
    // gives intellisense to canvas/webgl
    const canvas = document.createElement('canvas');
    canvas.id = 'myCanvas';
    document.body.appendChild(canvas);    
    const ctx = canvas.getContext('2d');
    
    canvas.width = 960;
    canvas.height = 540;

    ctx.drawImage(myImage, 0, 0, canvas.width, canvas.height);
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let particleArray = [];
    const numberOfParticles = 5000;

    let mappedImage = [];
    for (let y = 0; y < canvas.height; y++) {
        let row = [];
        for (let x = 0; x < canvas.width; x++) {
            const red = pixels.data[(y * 4 * pixels.width) + (x * 4)];
            const green = pixels.data[(y * 4 * pixels.width) + (x * 4 + 1)];
            const blue = pixels.data[(y * 4 * pixels.width) + (x * 4 + 2)];
            const brightness = calculateRelativeBrightness(red, green, blue);
            const cell = [
                cellBrightness = brightness,
                cellRed = red,
                cellGreen = green,
                cellBlue = blue
            ];
            row.push(cell);
        }
        // console.log(row);
        mappedImage.push(row);
    }

    // console.log(mappedImage);

    function calculateRelativeBrightness(red, green, blue) {
        return Math.sqrt(
            (red * red) * 0.299 +
            (green * green) * 0.587 +
            (blue * blue) * 0.114
        ) / 100;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width; 
            this.y = 0;
            this.speed = 0;
            this.velocity = Math.random() * 0.5;
            this.size = Math.random() * 1.5 + 1;
            this.position1 = Math.floor(this.y);
            this.position2 = Math.floor(this.x);
        }

        update() {
            this.position1 = Math.floor(this.y);
            this.position2 = Math.floor(this.x);
            this.speed = mappedImage[this.position1][this.position2][0];
            let movement = (2.5 - this.speed) + this.velocity;

            this.y += movement;
            if (this.y >= canvas.height) {
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            ctx.beginPath();
            // ctx.fillStyle = 'white';
            ctx.fillStyle = `rgba(${mappedImage[this.position1][this.position2][1]},
                                  ${mappedImage[this.position1][this.position2][2]},
                                  ${mappedImage[this.position1][this.position2][3]},
                                  ${mappedImage[this.position1][this.position2][0]})`;
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        for (let i = 0; i < numberOfParticles; i++) {
            particleArray.push(new Particle);
        }
    }

    function animate() {
        ctx.globalAlpha = 0.05;
        ctx.fillStyle = 'rgba(0, 0, 0, 0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 0.2;

        for (let i = 0; i < particleArray.length; i++) {
            particleArray[i].update();
            ctx.globalAlpha = particleArray[i].speed * 0.5;
            particleArray[i].draw();
        }
        requestAnimationFrame(animate);
    }

    init();
    animate();
};

const myImage = new Image();
// myImage.src = 'star_wars.jpeg';