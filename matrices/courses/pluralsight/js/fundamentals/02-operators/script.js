/* * * * * * * * * * *
* EQUALITY OPERATORS *
* * * * * * * * * *  */
console.log("----------------  EQUALITY OPERATORS ----------------");

let var1 = 1;
let var2 = "1";

if (var1 == var2) {} // true - converts types before checking
if (var1 === var2) {} // false - checks that they are the same type and value -- strict

console.log(1 == "1"); // true
console.log(1 === "1"); // false
console.log(1 == true); // true
console.log(1 === true); // false

let newVar = 123;
console.log(newVar == "123"); // true;
console.log(newVar === "123"); // false;


/* * * * * * * * * * * *
* INEQUALITY OPERATORS *
* * * * * * * * * * *  */
console.log("----------------  INEQUALITY OPERATORS ----------------");

if (var1 != var2) {} // converts types before checking
if (var1 !== var2) {} // checks that they are the same type and value -- strict

console.log(1 != "1"); // false
console.log(1 !== "1"); // true
console.log(1 != true); // false
console.log(1 !== true); // true

console.log(newVar != "123"); // false;
console.log(newVar !== "123"); // true;


/* * * * * * * *  *
* UNARY OPERATORS *
* * * * * * * * * */
console.log("----------------  UNARY OPERATORS ----------------");

let unaryVar1 = 1;
let unaryVar2 = 1;
let unaryVar3 = 1;
let unaryVar4 = 1;
let unaryVar5 = "1";
let unaryVar6 = 1;

console.log(++unaryVar1); // 2 - assigns first, then prints out
console.log(unaryVar2++); // 1 - prints out, then executes
console.log(unaryVar2); // 2 - printing out again we get the ++ now

console.log(--unaryVar3); // 0 - assigns first, then prints out
console.log(unaryVar4--); // 1 - prints out, then executes
console.log(unaryVar4); // 0 - printing out again we get the -- now

console.log(typeof(unaryVar5)); // string
console.log(unaryVar5); // "1"
console.log(+unaryVar5); // 1 - converts to number
console.log(-unaryVar6); // -1 - flips sign, -5 becomes 5 or 5 becomes -5


/* * * * * * * * *  *
* LOGICAL OPERATORS *
* * * * * * * * * * */
console.log("----------------  LOGICAL OPERATORS ----------------");


