const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');

const image1 = new Image();

const inputSlider = document.querySelector('#resolution');
const inputLabel = document.querySelector('#resolutionLabel');
inputSlider.addEventListener('change', handleSlider);

class Cell {
    constructor(x, y, symbol, color) {
        this.x = x;
        this.y = y;
        this.symbol = symbol;
        this.color = color;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillText(this.symbol, this.x, this.y);
    }
}

class AsciiEffect {
    #imageCellArray = [];
    #symbols = [];
    #pixels = [];
    #ctx; 
    #width;
    #height;

    constructor(ctx, width, height) {
        this.#ctx = ctx;
        this.#width = width;
        this.#height = height;
        this.#ctx.drawImage(image1, 0, 0, this.#width, this.#height);
        this.#pixels = this.#ctx.getImageData(0, 0, this.#width, this.#height);
        console.log(this.#pixels);
    }
    
    #convertToSymbol(colorValue) {
        if (colorValue > 250) return '@';
        else if (colorValue > 240) return '*';
        else if (colorValue > 220) return '+';
        else if (colorValue > 200) return '#';
        else if (colorValue > 180) return '&';
        else if (colorValue > 160) return '%';
        else if (colorValue > 140) return '_';
        else if (colorValue > 120) return ':';
        else if (colorValue > 100) return '$';
        else if (colorValue > 80) return '/';
        else if (colorValue > 60) return '-';
        else if (colorValue > 40) return 'X';
        else if (colorValue > 20) return 'W';
        else return '';
    }

    #scanImage(cellSize) {
        this.#imageCellArray = [];

        for (let y = 0; y < this.#pixels.height; y += cellSize) {
            for (let x = 0; x < this.#pixels.width; x += cellSize) {
                const posX = x * 4;
                const posY = y * 4;
                const pos = (posY * this.#pixels.width) + posX;

                if (this.#pixels.data[pos + 3] > 128) {
                    const red = this.#pixels.data[pos];
                    const green = this.#pixels.data[pos + 1];
                    const blue = this.#pixels.data[pos + 1];
                    const total = red + green + blue;
                    const averageColorValue = total / 3;
                    const color = `rgb(${red}, ${green}, ${blue})`;
                    const symbol = this.#convertToSymbol(averageColorValue);

                    if (total > 10 ) {
                        this.#imageCellArray.push(new Cell(x, y, symbol, color));
                    }
                }
            }
        }

        console.log(this.#imageCellArray);
    }

    #drawAscii() {
        this.#ctx.clearRect(0, 0, this.#width, this.#height);

        for (let i = 0; i < this.#imageCellArray.length; i++) {
            this.#imageCellArray[i].draw(this.#ctx);
        }
    }

    draw(cellSize) {
        this.#scanImage(cellSize);
        this.#drawAscii();
    }
}

let effect;

function handleSlider() {
    if (inputSlider.value === 1) {
        inputLabel.innerHTML = 'Original Image';
        ctx.drawImage(image1, 0, 0, canvas.width. canvas.height);
    } else {
        inputLabel.innerHTML = `Resolution: ${inputSlider.value} px`;
        ctx.font = parseInt(inputSlider.value) * 1.2 + 'px Verdana';
        effect.draw(parseInt(inputSlider.value));
    }
}

image1.onload = function initialize() {
    canvas.width = image1.width;
    canvas.height = image1.height;
    effect = new AsciiEffect(ctx, image1.width, image1.height);
}



image1.src = 'data:image/png;base64,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';