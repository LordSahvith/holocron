'use strict';

/*************
 * Reference *
 *************/
console.groupCollapsed('Reference');

const x = stooge;
x.nickname = 'Curly';
const nick = stooge.nickname;

// stooge and x refer to the same location in memory so updating one updates both
console.log(nick); // Curly

const a = {},
  b = {},
  c = {}; // define 3 different empty objects
a.test = 'only here'; // define a property
console.log(a, b, c); // {test: 'only here'} {} {}

const emptyObject = {}; // define empty object
const ab = emptyObject; // reference empty object
const bc = emptyObject; // reference empty object
const cd = emptyObject; // reference empty object
bc.test = 'only everywhere'; // define a property
console.log(ab, bc, cd); // {test: 'only everywhere'} {test: 'only everywhere'} {test: 'only everywhere'}

console.groupEnd('Reference');
