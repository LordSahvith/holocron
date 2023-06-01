'use strict';

/**********
 * Length *
 **********/
console.groupCollapsed('Length');

const myArray = [];
console.log('my array:', myArray); // []
console.log('my array length:', myArray.length); // 0

myArray[1000] = true;

// myArray contains 1 property
console.log('my array:', myArray); // [empty × 1000, true]
console.log('my array length:', myArray.length); // 1001

console.log('myArray[0]:', myArray[0]); // undefined
console.log('myArray[999]:', myArray[999]); // undefined
console.log('myArray[1000]:', myArray[1000]); // true

console.log('numbers before assigning length:', numbers); // ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
numbers.length = 3; // numbers comes from ./6.0-array-literals.js:9
console.log('numbers after assigning length:', numbers); // ['zero', 'one', 'two']

numbers[numbers.length] = 'shi';
console.log('numbers w/assign:', numbers); // ['zero', 'one', 'two', 'shi']

numbers.push('go');
console.log('numbers w/push():', numbers); // ['zero', 'one', 'two', 'shi', 'go']

console.groupEnd('Length');
