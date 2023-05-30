'use strict';

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