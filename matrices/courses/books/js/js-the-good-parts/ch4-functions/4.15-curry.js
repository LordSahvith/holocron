'use strict';

/*********
 * Curry *
 *********/
console.groupCollapsed('Curry');

Function.method('curry', function () {
  const slice = Array.prototype.slice;
  const args = slice.apply(arguments); // arguments is not an array so we need to cast it
  const that = this;

  return function () {
    return that.apply(null, args.concat(slice.apply(arguments)));
  };
});

const add1 = add.curry(1);
console.log('add1: ', add1(6));

console.groupEnd('Curry');
