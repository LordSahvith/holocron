'use strict';

/**************
 * Exceptions *
 **************/
console.groupCollapsed('Exceptions');

const addException = function (a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw {
      name: 'TypeError',
      message: 'add needs numbers',
    };
  }

  return a + b;
};

const try_it = function () {
  try {
    addException('seven');
  } catch (e) {
    console.log(`${e.name}: ${e.message}`);
  }
};

try_it();

console.groupEnd('Exceptions');
