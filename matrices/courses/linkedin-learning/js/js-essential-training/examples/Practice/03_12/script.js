/**
 * Practice: Making classes and objects
 *
 * - Find a type of object you have more than one of in your house (eg. clothing, writing tools, etc).
 * - Create a class describing this object type - its properties and methods.
 * - Create several objects using the class.
 * - Test the objecs by calling their properties and using their methods in the console.
 */

class Pen {
    constructor (
        type,
        color,
        isOpen
    ) {
        this.type = type;
        this.color = color;
        this.isOpen = isOpen;
    }

    changeType(newType) {
        this.type = newType;
    }

    changeColor(newColor) {
        this.color = newColor;
    }

    toggleOpen(status) {
        this.isOpen = status;
    }
}

const blueBallpoint = new Pen('Ballpoint', 'Blue', false);
const blackBallpoint = new Pen('Ballpoint', 'Black', false);
const blackFeatherTipped = new Pen('Feather Tipped', 'Black', false);

console.log(blueBallpoint);
console.log(blackBallpoint);
console.log(blackFeatherTipped);
