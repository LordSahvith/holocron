'use strict';

/*******************************
 * Function Invocation Pattern *
 *******************************/
console.groupCollapsed('Function Invocation');

/**
 * here with Function Invocation Patter, 'this' gets assinged to the global function - not a desired result (a bit of a flaw in the design)
 * the workaround for this is explained a bit further down (line: 88 - when we assign 'this' to 'that)
 */
const immediateInvocation = add(3, 4); // gets invoked immediately since it's not a property and has parentheses () (function invocation pattern)

console.log('immediateInvocation: ', immediateInvocation); // 7 - returns the result since it was invoked on creation (line 68)

/**
 * assign the add() function but does not run until invoked
 * (i.e. parentheses () are appended)
 * or, if it's a property, not until method invocation (starts line: 43)
 * (i.e. dot (Object.whatever()) or subscript (Object[{whatever}]) expressions)
 */
const notImmediateInvocation = add;

console.log('notImmediateInvocatin: ', add); // ƒ add(a, b) { return a + b; }
console.log('notImmediateInvocatin: ', add(4, 4)); // 8 - function invocation pattern

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
