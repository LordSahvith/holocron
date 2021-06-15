/* * * * *  *
* CONSTANTS *
* * * * * * */
// const carId; // results in error - must initialize
// const carId2 = 100; // perfect
// carId = 5; // throws error - can't reassign const variables

/* * * * * * *
* LET vs VAR *
* * * * * *  */

// HOISTING \\
// console.log("let carId3 before initialization:", carId3); // error - Cannot access 'carId3' before initialization
let carId3 = 4; // let's can't be called before being initialized
console.log("let carId3 after initialization:", carId3); // 4 - let's require intialization before being called

console.log("var carId4 before initialization:", carId4); // undefined (not error) - var's get hoisted so when called before initialization is undefined
var carId4 = 44;
console.log("var carId4 after initialization:", carId4); // 44


// BLOCK SCOPE \\
if (true) {
    let carId5 = 6;
    console.log("let carId5 in block:", carId5); // 6
}
// console.log("carId5 after block:", carId5); // error - carId5 is not defined - due to block scoping

if (true) {
    var carId6 = 17;
    console.log("var carId6 in block:", carId6); // 17
}
console.log("var carId6 after block:", carId6); // 17 - var has no block scope


/* * * * * * * *  *
* REST PARAMETERS *
* * * * * * * * * */
function sendCars(...allCarIds) {
    allCarIds.forEach(id => console.log(id));
}

// sendCars(carId3, carId4, carId5); // error - carId5 is not defined
sendCars(carId3, carId4, carId6); // 4  44  17

function sendCarsOnDay(day, ...allCarIds) {
    console.log(day);
    allCarIds.forEach(id => console.log(id));
}

// sendCars(carId3, carId4, carId5); // error - carId5 is not defined
sendCars("Monday", 1, 2, 3); // Monday  1  2  3


/* * * * * * * * * * * *
* DESTRUCTURING ARRAYS *
* * * * * * * * * * *  */
let carIds = [1, 2, 4];
let [car1, car2, car3] = carIds;
console.log(car1, car2, car3); // 1  2  4

let carIds2 = [2, 3, 5];
// let car1, remainingCars; // error - Identifier 'car1' has already been declared
let car4, remainingCars;
[car4, ...remainingCars] = carIds2;
console.log(car4, remainingCars); // 2  [3, 5]

let carIds3 = [3, 4, 6, 8];
let remainingCars2;
[, ...remainingCars2] = carIds3;
console.log(remainingCars2); // [4, 6, 8]

let carIds4 = [4, 5, 7, 9];
let remainingCars3;
[,, ...remainingCars3] = carIds4; // each , skips the index
console.log(remainingCars3); // [7, 9]

let carIds5 = [5, 6, 8, 10];
let car5, car6, theRest;
// [, car2, ...theRest] = car5; // error - undefined is not iterable (cannot read property Symbol(Symbol.iterator)) -- car5 is undefined
[, car2, ...theRest] = carIds5; 
console.log(car1, car2, theRest); // 1  6  [8, 10]
let carIds6 = [6, 7, 9, 11];
[car5, car6, ...theRest] = carIds6; 
console.log(car5, car6, theRest); // 6  7  [9, 11]


/* * * * * * * * * * *  *
* DESTRUCTURING OBJECTS *
* * * * * * * * * * * * */
let carObj = {id: 9001, style: "sports"};
let {id, style} = carObj;
console.log(id, style); // 9001, "sports"

let carObj2 = {id: 9002, style: "sports deluxe"};
let id2, style2;
// {id2, style2} = carObj2; // error - Unexpected token '=' -- JS thinks this is a block
({id2, style2} = carObj2); 
console.log(id2, style2); // undefined, undefined

let carObj3 = {id3: 9002, style3: "sports deluxe"}; // id's need to match? it's weird but that's the only way to get the correct values vs undefined
let id3, style3;
({id3, style3} = carObj3); 
console.log(id3, style3); // 9002, "sports deluxe"


/* * * * * * *  *
* SPREAD SYNTAX *
* * * * * * * * */
// note: spread is opposite of rest \\

function startCars(car1, car2, car3) {
    console.log(car1, car2, car3);
}

let carIds7 = [4, 8, 12];
startCars(...carIds7); // 4  8  12

let carCodes = "abc";
startCars(carCodes); // abc undefined undefined
startCars(...carCodes); // a  b  c -- strings are iterables

function startCarsAgain(car1, car2, car3, ...others) { // rest - used to store remaining items in an array
    console.log(others);
}

let carIds8 = [4, 16, 84, 336, 1344];
startCarsAgain(...carIds8); // [336, 1344] -- spread - used to "spread" an array across parameters

let rest = [1, 2, 3];
let spread = [...rest];

console.log(spread); // [1, 2, 3]

sendCars(...spread); // 1  2  3  -- sendCars() is spreading across the rest inside sendCars()

let item1, item2, rest2;
rest.push(4);
[item1, item2, ...rest2] = rest;
console.log(item1, item2, rest2); // 1  2  [3, 4]


/* * * *  *
* TYPE OF *
* * * * * */

console.log(typeof(1));            // number
console.log(typeof(true));         // boolean
console.log(typeof("Sahvith"));    // string
console.log(typeof(function(){})); // function
console.log(typeof({}));           // object
console.log(typeof(null));         // object -- roots to C days when null was a null object
console.log(typeof(undefined));    // undefined
console.log(typeof(NaN));          // number -- trying to do a numberic operation that failed


/* * * * * * * * * *
* TYPE CONVERSIONS *
* * * * * * * * *  */

let foo = 44;

// convert to string
foo.toString(); // "44" as a string

// convert string to integer
Number.parseInt("44"); // 44 as a number

// convert string to number
Number.parseFloat("44.99"); // 44.99 as a number


/* * * * * * * * *  *
* CONTROLLING LOOPS *
* * * * * * * * * * */

let i = 0;
for (; i < 12; i++) {
    if (i === 8) {
        break; // exits for loop
    }
}
console.log(i); // 8

for (let j = 0; j < 4; j++) {
    if (j === 2) {
        continue; // skips to end of for without executing any additional code
    }
    console.log(j); // 0 1 3
}
