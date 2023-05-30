'use strict';

/*************
 * Prototype *
 *************/
console.groupCollapsed('Prototype');

// PROTOTYPES ARE FOR RETRIEVAL ONLY
if (typeof Object.create !== 'function') {
  Object.create = function (o) {
    const F = function () {};
    F.prototype = o;
    return new F();
  };
}
const another_stooge = Object.create(stooge);
console.log(another_stooge); // {}

// properties added to the prototype link have no effect on the object's prototype
another_stooge['first_name'] = 'Harry'; // assign new name to prototype link
another_stooge['middle_name'] = 'Moses'; // same
another_stooge.nickname = 'Moe'; // same
// log out object's prototype to see that it was unchanged
console.log(stooge.nickname); // Curly

stooge.profession = 'actor';
console.log(another_stooge.profession); // actor

console.groupEnd('Prototype');
