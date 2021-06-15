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


/* * * * * * * * * * * * * * * *
* LOGICAL (BOOLEANS) OPERATORS *
* * * * * * * * * * * * * * *  */
console.log("----------------  LOGICAL (BOOLEANS) OPERATORS ----------------");

let let1 = "string";
let let2 = 44;

if (typeof(let1) === "string" && let2 === 44) { // both must pass
    console.log("passed both");
}

if (typeof(let1) === "string" || let2 === 46) { // one or more must pass
    console.log("passed at least one");
}

if (let2 === 46 || typeof(let1) === "string" && let2 === 44) { // && has higher precedence and will execute first
    console.log("passed");
}

if (let2 === 46 || typeof(let1) === "string" && let2 === 46) { // && has higher precedence and will execute first
    console.log("passed");
} else {
    console.log("failed");
}

if ((let2 === 46 || typeof(let1) === "string") && let2 === 44) { // order of operations () has higher precedence and will execute first
    console.log("passed");
}

if ((let2 === 46 || typeof(let1) === "string") && let2 === 46) { // order of operations () has higher precedence and will execute first
    console.log("passed");
} else {
    console.log("failed");
}

let obj1 = null;
let obj2 = {name: "default"};

console.log(obj1 || obj2) // {name: "default"}
console.log(obj1 && obj2) // null

let obj3 = {name: "Sahvith"};
let obj4 = {name: "default"};

console.log(obj3 || obj4) // {name: "Sahvith"}
console.log(obj3 && obj4) // {name: "default"}

let car = null;

console.log(car); // null
console.log(!car); // true

if (!car) {
    car = {};
}

console.log(car); // {}
console.log(!car); // false


/* * * * * * * * * * * *
* RELATIONAL OPERATORS *
* * * * * * * * * * *  */
console.log("----------------  RELATIONAL OPERATORS ----------------");

let string1 = "Zoo";
let string2 = "alphabet";

if (string1 < string2) { // true - goes of ascii value which uppercase letters come before lowercase
    console.log(true);
} else {
    console.log(false);
}

if (string1.toUpperCase() < string2.toUpperCase()) { // false - convert strings to either all uppercase or lowercase before checking
    console.log(true);
} else {
    console.log(false);
}


/* * * * * * * * * * *  *
* CONDITIONAL OPERATORS *
* * * * * * * * * * * * */
console.log("----------------  CONDITIONAL OPERATORS ----------------");

console.log((4 < 44) ? "yes" : "no"); // yes

let test = null;
console.log(!test ? {test: "one"} : test); // {test: "one"}

let test2 = {};
console.log(!test2 ? {test: "two"} : test2); // {}

let test3 = null;
let test4 = {test: "three"};
console.log(test3 ? {} : test4); // {test: "three"}


/* * * * * * * * * * * *
* ASSIGNMENT OPERATORS *
* * * * * * * * * * *  */
console.log("----------------  ASSIGNMENT OPERATORS ----------------");

let quiz = 1;

console.log(quiz += 10); // 11 - adds 10 to current value and returns
console.log(quiz -= 2); // 9 - subtracts 2 from current value and returns
console.log(quiz /= 3); // 3 - divides 3 from current value and returns
console.log(quiz *= 4); // 12 - mulitplies current value by 4 and returns
console.log(quiz %= 5); // 2 - divides 5 from the current value and returns what's left over

// BIT SHIFTING \\
console.log(quiz <<= 1); // 4 - shift to the left 1 bit -- equivalent to multiplying by 2
console.log(quiz >>= 1); // 2 - shift to the right 1 bit -- equivalent to dividing by 2

let quiz2 = 24;
console.log(quiz2 <<= 1); // 48 - shift to the left 1 bit -- equivalent to multiplying by 2
console.log(quiz2 >>= 1); // 24 - shift to the right 1 bit -- equivalent to dividing by 2


/* * * * * * * * * * * *
* OPERATOR PRECEDENCE *
* * * * * * * * * * *  */
console.log("----------------  OPERATOR PRECEDENCE ----------------");

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#table
