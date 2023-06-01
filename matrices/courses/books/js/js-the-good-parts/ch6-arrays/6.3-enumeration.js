'use strict';

/***************
 * Enumeration *
 ***************/
console.groupCollapsed('Enumeration');

// order not guaranteed, also iterates over prototype chain
// in this instance, numbers will have a 'superior' method
// that will be iterated over so you'll need to check the type
for (const number in numbers) {  
  if (typeof numbers[number] !== 'function') {
    console.log('not a function:', numbers[number]);
  } else {
    console.log('is a function:', numbers[number]);
  }
}

// the conventional for loop is perfect for iterating
// over the indexed items so no type checking is necessary
for (let i = 0; i < numbers.length; i++) {
  console.log(`numbers[${i}]: ${numbers[i]}`);
}

const testArray = [];
testArray[5] = 'test';

// this will also loop over the undefined or emtpy indexes
for (let i = 0; i < testArray.length; i++) {
  console.log(`testArray[${i}]: ${testArray[i]}`);
}

// this for in loop only loops over existing indexes
// but alos the prototype chain as well
for (const test in testArray) {  
  if (typeof testArray[test] !== 'function') {
    console.log('not a function:', testArray[test]);
  } else {
    console.log('is a function:', testArray[test]);
  }
}

console.groupEnd('Enumeration');
