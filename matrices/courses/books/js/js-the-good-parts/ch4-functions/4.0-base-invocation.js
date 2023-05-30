'use strict'; // changes behavior - ie. 'this' becomes undefined if not specified

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
