/* * * * *  *
* CONSTANTS *
* * * * * * */
// const carId; // results in error - must initialize
// const carId2 = 100; // perfect
// carId = 5; // throws error - can't reassign const variables

/* * * * *  *
* LET vs VAR *
* * * * * * */

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
