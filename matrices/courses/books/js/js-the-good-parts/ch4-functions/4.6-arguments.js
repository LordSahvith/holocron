'ust strict';

/*************
 * Arguments *
 *************/
console.groupCollapsed('Arguments');

/**
 * Arguments Array: a bonus parameter that is available when a function is invoked
 * caveat: this is a work around and doens't work with ES6 arrow functions - which is the preferred and modern way
 */
const argumentsExample = function () {
  console.log('arguments: ', arguments);
};

argumentsExample(); // [callee: (...), Symbol(Symbol.iterator): ƒ, ...]
argumentsExample('a', 'two', 3); // ['a', 'two', 3, callee: (...), Symbol(Symbol.iterator): ƒ, ...]

/**
 * ES6 sorta solves this with a rest parameter, however,
 * this doesn't have the extra data as a function invocation pattern
 * and isn't the true Arguments Array
 */
const argumentsArrowExample = (...args) => {
  console.log('arrow: ', args);
};

argumentsArrowExample(); // []
argumentsArrowExample('a', 'two', 3); // ['a', 'two', 3]

// book example
const sumArray = function () {
  let i;
  let sumDeclared; // just declaring will cause variable to be NaN
  let sum = 0; // make sure to define your variable by assigning a value

  for (i = 0; i < arguments.length; i++) {
    console.log('array: ', arguments[i], typeof arguments[i]);
    sum += arguments[i];
    sumDeclared += arguments[i];
  }

  return { sum, sumDeclared };
};

console.log('sum: ', sumArray(1, 2, 3, 4, 5, 6, 7, 8, 9)); // {sum: 45, sumDeclared: NaN}

// arrow conversion - this is the preferred way
const sumArrayArrow = (...args) => {
  let i;
  let sumDeclared; // just declaring will cause variable to be NaN
  let sum = 0; // make sure to define your variable by assigning a value

  for (i = 0; i < args.length; i++) {
    console.log('array: ', args[i], typeof args[i]);
    sum += args[i];
    sumDeclared += args[i];
  }

  return { sum, sumDeclared };
};

console.log('sum Arrow: ', sumArrayArrow(1, 2, 3, 4, 5, 6, 7, 8, 9)); // {sum: 45, sumDeclared: NaN}

console.groupEnd('Arguments');
