'use strict';

/***********
 * Methods *
 ***********/
console.groupCollapsed('Methods');

Array.method('reduce', function (f, value) {
  let i;
  for (i = 0; i < this.length; i++) {
    value += f(this[i], value);
  }
  return value;
});

const dataMethods = [4, 8, 16, 32, 64, 128];

const addMethod = function (a, b) {
  return a + b;
};

const multMethod = function (a, b) {
  return a * b;
};

// invoke dataMethod's reduce method, passing in add function
const sumMethod = dataMethods.reduce(addMethod, 0); // 768
console.log('sumMethod: ', sumMethod);

// invoke dataMethod's reduce method, passing in multiply function
const productMethod = dataMethods.reduce(multMethod, 1);
console.log('productMethod: ', productMethod); // 211679325

dataMethods.total = function () {
  return this.reduce(addMethod, 0);
};
console.log('method on array:', dataMethods.total()); // 768

console.groupEnd('Methods');
