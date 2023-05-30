'use strict';

/***************
 * Enumeration *
 ***************/
console.groupCollapsed('Enumeration');

// Enumeration: the action of mentioning a number of things one by one.
console.log('Enumeration: the action of mentioning a number of things one by one.');

// this will loop over all propeties, even those of the prototype, and in no particular order
// if that's not desired then you should filter out undesired values
// using hasOwnProperty() method with typeof will help filter out the prototype chain
let myName;
for (myName in another_stooge) {
  if (typeof another_stooge[myName] !== 'function') {
    console.log(`${myName}: ${another_stooge[myName]}`);
  }
}

console.log('using an array to control order of names:');
let i;
let properties = ['first-name', 'middle-name', 'last-name', 'profession'];
// using a 'for' instead of a 'for in' we were able filter out any
//  values/properties from prototype chain
for (i = 0; i < properties.length; i++) {
  console.log(`${properties[i]}: ${another_stooge[properties[i]]}`);
}

console.groupEnd('Enumeration');
