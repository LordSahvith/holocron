'use strict';

/**********
 * Return *
 **********/
console.groupCollapsed('Return');

const returnFunction1 = function () {
  console.log('I get logged.');
  return; // returns exit block of code immediately and not code is executed after inside the block
  console.log('but I do not');
};

returnFunction1();

const testReturn1 = returnFunction1();

console.log('test return 1: ', testReturn1); // undefined - functions always return a value, even when there isn't a return, in this case, undefined is returned

const returnFunction2 = function () {
  return 'the truth is out there!'; // returns exit block of code immediately and not code is executed after inside the block
};

console.log('test with value: ', returnFunction2()); // the truth is out there!

const ReturnFunction3 = function (first, last) {
  this.first = first;
  this.last = last;

  return true; // don't pass an object, so 'this' (the new object) will be returned
};

const testReturn3 = new ReturnFunction3('lord', 'savith'); // when a 'new' prefix is used and the return value isn't an object, then 'this' (the new object) will be returned
console.log('test return: ', testReturn3); // { first: 'lord', last: 'savith' }

console.groupEnd('Return');
