'use strict'; // changes behavior - ie. 'this' becomes undefined if not specified

// helpers
function add(a, b) {
  return a + b;
}

console.groupCollapsed('Ch4 - Functions');

/*******************
 * Base Invocation *
 *******************/
console.groupCollapsed('Base Invocation');

/**
 * Invocation - passed arguments + `this` & `arguments`
 * @param {*} one - anything
 * @param {*} two - anything
 * @param {Object} this - determined by invocation pattern (method, function, constructor or apply
 * @param {Array} arguments - existing properties passed from calee invocation
 */
function baseInvocation(one, two, that) {
  console.log('one: ', one); // came from foo.three
  console.log('two: ', two); // came from foo.four
  console.log('this: ', that); // depends on platform (ie. web, server, etc.) or if strict mode is active
  console.log('arguments: ', arguments); // parameters from foo() declaration which are passed in by foo() invocation arguments
  console.log('three: ', arguments[0]); // 'first'
  console.log('four: ', arguments[1]); // 'second'
}

function foo(one, two, globalObj) {
  const three = one;
  const four = two;
  const that = globalObj;
  baseInvocation(three, four, that); // arguments are passed through as array - [one, two]
}

const globalObj = this; // EDUCATIONAL PURPOSES, NOT RECOMMENDED - passing the global object is a security risk, just showing use case for strict mode
foo('first', 'second', globalObj); 

console.groupEnd('Base Invocation');

/*****************************
 * Method Invocation Pattern *
 *****************************/
console.groupCollapsed('Method Invocation');

const myObject = {
  value: 0,
  increment: function (inc) {
    this.value += typeof inc === 'number' ? inc : 1;
  },
};

myObject.increment();
console.log(myObject.value); // 1

myObject.increment(2);
console.log(myObject.value); // 3

console.groupEnd('Method Invocation');

/*******************************
 * Function Invocation Pattern *
 *******************************/
console.groupCollapsed('Function Invocation');

myObject.double = function () {
  const that = this; // workaround for this since this will be scoped to global object

  const helper = function () {
    that.value += add(that.value, that.value);
  };

  const helper2 = function () {
    console.log('i am here');
    // because of function invocation `this` is scoped globally (where it's used determines the object - ex. web, server, etc.) and not myObject
    // this will fail and throw an error (in strict mode)
    this.value += add(this.value, this.value); // TypeError: Cannot read property 'value' of undefined
  };

  helper(); // Invoke helper as a function

  try {
    helper2(); // Invoke helper2 as a function and wrap in try/catch cuz it WILL fail
  } catch (error) {
    // TypeError: Cannot read property 'value' of undefined
    console.error(error);
  }
};

myObject.double(); // Invoke double as a method
console.log(myObject.value); // 9 : (3 += (3 + 3) = 9)

// Method Invocation conversion - not relying on internal helper() function call to scope `this` to myObject
myObject.doubleMethod = function () {
  this.value += add(this.value, this.value);
};

myObject.doubleMethod(); // Invoke doubleMethod as a method
console.log(myObject.value); // 27 : (9 += (9 + 9) = 27)

console.groupEnd('Function Invocation');

/**********************************
 * Constructor Invocation Pattern *
 **********************************/
console.groupCollapsed('Constuctor Invocation');

const Quo = function (string) {
  this.status = string;
};

// Give all instances of Quo a public method
// called get_status
Quo.prototype.get_status = function () {
  return this.status;
};

// Make an instance of Quo
const myQuo = new Quo('confused');
console.log(myQuo.get_status()); // confused

const myQuo2 = new Quo('still confused');
console.log(myQuo2.get_status()); // still confused

myQuo2.get_status = function () {
  // overwrite get_status for myQuo2 instance only
  return this.status + " and you've been overwritten";
};

myQuo2.set_status = function (string) {
  // add to myQuo2 instance
  this.status = string;
};

// since set_status was only set on myQuo2 and not the prototype,
// myQuo doesn't have access to set_status
try {
  myQuo.set_status('am I confused');
} catch (error) {
  // ERROR: Uncaught TypeError: myQuo.set_status is not a function
  console.error(error);
}

myQuo2.set_status('no longer confused');
console.log(myQuo.get_status()); // confused
console.log(myQuo2.get_status()); // no longer confused and you've been overwritten

console.groupEnd('Constuctor Invocation');

/****************************
 * Apply Invocation Pattern *
 ****************************/
console.groupCollapsed('Apply Invocation');

// make an array of 2 numbers and add them
const array = [3, 4];
const sum = add.apply(null, array);
console.log(sum); // 7

// Make an object with a status member
const statusObject = {
  status: 'A-OK',
};

// statusObject does not inherit from Quo.prototype
// but we can invoke the get_status method on
// statusObject even though statusObject does not have
// a get_status method
const status1 = Quo.prototype.get_status.apply(statusObject);
console.log(status1); // A-OK
const status2 = myQuo2.get_status.apply(statusObject);
console.log(status2); // A-OK and you've been overwritten

console.groupEnd('Apply Invocation');

console.groupEnd('Ch4 - Functions');
