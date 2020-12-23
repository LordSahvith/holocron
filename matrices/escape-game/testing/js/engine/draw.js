console.group('Drawing Library');
console.log('compilation started...');

function drawCanvas() {
    let canvasBackground = 'black';
    drawRect(0, 0, canvas.width, canvas.height, canvasBackground);
}

/**
 * Creates a rectangle with given parameters
 * @param {int} topLeftX 
 * Set top left X position
 * @param {int} topLeftY 
 * Set top left Y position
 * @param {int} width 
 * Set width of rectangle
 * @param {int} height 
 * Set height of rectangle
 * @param {string} fillColor 
 * Set fill color for rectangle
 */
function drawRect(topLeftX, topLeftY, width, height, fillColor) {
    canvastContext.fillStyle = fillColor;
    canvastContext.fillRect(topLeftX, topLeftY, width, height);
}

/**
 * Creates a circle with given parameters
 * @param {int} centerX 
 * Set center X position
 * @param {int} centerY 
 * Set center Y position
 * @param {int} radius 
 * Set radius of circle
 * @param {string} fillColor 
 * Set fill color for circle
 */
function drawCircle(centerX, centerY, radius, fillColor) {
    canvastContext.fillStyle = fillColor;
    canvastContext.beginPath();
    canvastContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvastContext.fill();
}

/**
 * Creates text with given paramters
 * @param {string} text 
 * Text to be displayed
 * @param {int} xPos 
 * Text X position
 * @param {int} yPos
 * Text Y position 
 * @param {string} color 
 * Color for text
 */
function drawText(text, xPos, yPos, color) {
    canvastContext.fillStyle = color;
    canvastContext.fillText(text, xPos, yPos);
}

/**
 * Creates an image with rotation
 * @param {img} useBitmap 
 * Image to add to screen
 * @param {int} atX 
 * Image X position
 * @param {int} atY
 * Image Y position 
 * @param {float} withAng 
 * Angle to rotate image
 */
function drawBitMapCenteredWithRotation(useBitmap, atX, atY, withAng) {
    canvastContext.save();
    canvastContext.translate(atX, atY);
    canvastContext.rotate(withAng);
    canvastContext.drawImage(useBitmap, -useBitmap.width / 2, -useBitmap.height / 2);
    canvastContext.restore();
}

console.log('compilation successful.');
console.groupEnd();