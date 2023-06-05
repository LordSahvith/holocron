'use strict';

/******************
 * Array Literals *
 ******************/
console.groupCollapsed('Array Literals');

// inherits from Array.prototype
const empty = [];
const numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

console.log('empty:', empty); // []
console.log('empty[1]:', empty[1]); // undefined
console.log('numbers:', numbers); // ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
console.log('numbers[1]:', numbers[1]); // one
console.log('empty.length:', empty.length); // 0
console.log('numbers.length:', numbers.length); // 10

// inherits from Object.prototype
const numbers_object = {
  0: 'zero',
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
};

// arrays can have any type
const array_type = ['one', 2, 1 + 2, { 4: 'four' }];
console.log('array type:', array_type); // ['one', 2, 3, {…}]

console.groupEnd('Array Literals');
