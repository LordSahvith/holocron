'use strict';

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
