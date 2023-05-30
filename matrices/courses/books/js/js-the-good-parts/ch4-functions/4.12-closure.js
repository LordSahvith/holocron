'use strict';

/***********
 * Closure *
 ***********/
console.groupCollapsed('Closure');

const myObjectClosure = (function () {
  let value = 0;

  return {
    increment: inc => {
      value += typeof inc === 'number' ? inc : 1; // JS keeps value alive as long as it's needed for this function - closure
    },
    getValue: () => {
      return value;
    },
  };
})(); // () at end invokes the anonymous function

console.log('myObjectClosure: ', myObjectClosure); // {increment: ƒ, getValue: ƒ}
console.log('myObjectClosure.getValue(): ', myObjectClosure.getValue()); // 0
console.log('myObjectClosure.increment(): ', myObjectClosure.increment()); // undefined
console.log('myObjectClosure.getValue(): ', myObjectClosure.getValue()); // 1
console.log('myObjectClosure: ', myObjectClosure); // {increment: ƒ, getValue: ƒ}

/**
 * create a maker function called quo. it makes an
 * object with a get_status method and a private
 * status property
 */
const quoClosure = status => {
  return {
    get_status: () => {
      return status;
    },
  };
};

// make an instance of quo
const myQuoClosure = quoClosure('closure is pretty cool');
console.log('myQuoClosure.get_status: ', myQuoClosure.get_status()); // closure is pretty cool

// set DOM node color to yellow and fade to white
const fade = node => {
  let level = 1;
  const step = () => {
    let hex = level.toString(16);
    node.style.backgroundColor = '#FFFF' + hex + hex;
    if (level < 15) {
      level += 1;
      setTimeout(step, 100);
    }
  };
  setTimeout(step, 100);
};

fade(document.body);

console.groupEnd('Closure');
