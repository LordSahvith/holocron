'use strict';

/**************
 * Reflection *
 **************/
console.groupCollapsed('Reflection');

// typeof will look at the prototype chain for this property and can produce a value
console.log(typeof flight.number); // number
console.log(typeof flight.status); // string
console.log(typeof flight.arrival); // object
console.log(typeof flight.manifest); // undefined
console.log(typeof flight.toString); // function
console.log(typeof flight.constructor); // function

// hasOwnProperty() does NOT look at the prototype chain, therefore 'constructor' & 'toString' are false and 'number' & 'status' are true
// the 'constructor' property is owned by the prototype which is why the above (ln: 355) returns 'function'
console.log(flight.hasOwnProperty('number')); // true
console.log(flight.hasOwnProperty('constructor')); // false
console.log(flight.hasOwnProperty('toString')); // false
console.log(flight.hasOwnProperty('status')); // true

console.groupEnd('Reflection');
