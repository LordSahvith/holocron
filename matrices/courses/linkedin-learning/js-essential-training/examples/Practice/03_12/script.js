/**
 * Practice: Making classes and objects
 *
 * - Find a type of object you have more than one of in your house (eg. clothing, writing tools, etc).
 * - Create a class describing this object type - its properties and methods.
 * - Create several objects using the class.
 * - Test the objecs by calling their properties and using their methods in the console.
 */

import GameConsole from "./GameConsole.js";

const xbox = new GameConsole(
    "Xbox One X",
    "black",
    "AC",
    "3",
    {
        name: "Red Dead Redemption 2",
        isDisc: false,
        size: "95gb"
    },
    false
);

const ps4 = new GameConsole(
    "PS4",
    "Red",
    "AC",
    "3",
    {
        name: "Red Dead Redemption 2",
        isDisc: false,
        size: "95gb"
    },
    false
);

console.log(xbox);
console.log(ps4);
console.log(xbox.startGame());
console.log(ps4.startGame());