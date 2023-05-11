'use strict';

console.groupCollapsed('Ch3 - Objects');

console.groupCollapsed('4 types of objects');

/**
 * 4 ways to create an Object in JS
 *   1. Object Literals
 *   2. Constructor Functions
 *   3. ECMAScript 6 classes
 *   4. Object.create() method
 */

// Object Literals
console.groupCollapsed('Object Literals');

const empty_object_literal = {}; // simplest object
const object_literal = {
  one: 'one',
  two: 'two',
};

console.log('empty object: ', empty_object_literal);
console.log('object: ', object_literal);

console.groupEnd('Object Literals');

// Constructor Functions
console.groupCollapsed('Constructor Functions');

function User(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}
console.log(User);

const myUser = new User('Lord', 'Savith');
console.log('Object: ', myUser);

console.groupEnd('Constructor Functions');

// ECMAScript 6 Class
console.groupCollapsed('ECMAScript 6 Class');

console.groupCollapsed('Declaration');
class Person1 {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  printName() {
    console.log(`${this.firstName} ${this.lastName}`);
  }
}
console.log(Person1);

const myPerson1 = new Person1('Lord', 'Savith');
console.log('Object:', myPerson1);
myPerson1.printName(); // Lord Savith

console.groupEnd('Declaration');

console.groupCollapsed('Expression');

const Person2 = class {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  printName() {
    console.log(`${this.firstName} ${this.lastName}`);
  }
}
console.log(Person2);

const myPerson2 = new Person2('Lord', 'Savith');
console.log('Object:', myPerson2);
myPerson2.printName(); // Lord Savith

const Person3 = class Person4 {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  printName() {
    console.log(`${this.firstName} ${this.lastName}`);
  }
}
console.log(Person3);

const myPerson3 = new Person3('Lord', 'Savith'); // uses variable Person3 but myPerson3 becomes an instantiation of Person4 Class
console.log('Object:', myPerson3);
myPerson3.printName(); // Lord Savith

console.groupEnd('Expression');

console.groupEnd('ECMAScript 6 Class');

console.groupCollapsed('Object.create()');

const myNewPerson = {
  jsIsOddButCool: true,
  otherCoolThings: function () { // declarative
    if (this.name && this.jsIsOddButCool) {
      console.log(`My name is ${this.name}. Pretty cool.`);
    } else {
      console.log(`Sorry you haven't been given a name yet. That's like 60% less cool: ${this.jsIsOddButCool}`);
    }
  },
  otherCoolThingsWithES6() { // ES6
    if (this.name && this.jsIsOddButCool) {
      console.log(`My name is ${this.name}. Pretty cool.`);
    } else {
      console.log(`Sorry you haven't been given a name yet. That's like 60% less cool: ${this.jsIsOddButCool}`);
    }
  },
  notSoCoolThings: () => console.log(`Arrow functions have 'this' bound? ${this.jsIsOddButCool}`),
  howToUseArrowFunctionWithThis: () => console.log('Just don\'t. Use a declarative or ES6 function instead.')
};
console.log(myNewPerson);

const myNewPerson1 = Object.create(myNewPerson);
console.log('myNewPerson1: ', myNewPerson1);
myNewPerson1.otherCoolThings(); // Sorry you haven't been given a name yet. That's like 60% less cool: true

const myNewPerson2 = Object.create(myNewPerson);
myNewPerson2.name = 'Lord Savith';
console.log('myNewPerson2: ', myNewPerson2);
myNewPerson2.otherCoolThings(); // `My name is Lord Savith. Pretty cool.
myNewPerson2.otherCoolThingsWithES6(); // `My name is Lord Savith. Pretty cool.
myNewPerson2.notSoCoolThings(); // `Arrow functions have 'this' bound? undefined
myNewPerson2.howToUseArrowFunctionWithThis(); // Just don't. Use a declarative or ES6 function instead.

console.groupEnd('Object.create()');

console.groupEnd('4 types of objects');

/*******************
 * Object Literals *
 *******************/
console.groupCollapsed('Object Literals');

// key/value - keys require quotes if name isn't legal (ex. hyphens, reserved words, numbers in first postition, etc)
const stooge = {
  'first-name': 'Lord',
  'last-name': 'Savith',
  first_name: 'lord',
  last_name: 'savith',
};

console.log(stooge);

// can nest objects within objects
const flight = {
  airline: 'Oceanic',
  number: 815,
  departure: {
    IATA: 'SYD',
    time: '2004-09-22 14:55',
    city: 'Sydney',
  },
  arrival: {
    IATA: 'LAX',
    time: '2004-09-23 10:42',
    city: 'Los Angeles',
  },
};

console.log(flight);

console.groupEnd('Object Literals');

/*************
 * Retrieval *
 *************/
console.groupCollapsed('Retrieval');

console.log(stooge['first-name']); // Lord
console.log(stooge.last_name); // savith
console.log(flight.departure); // {IATA: 'SYD', time: '2004-09-22 14:55', city: 'Sydney'}
console.log(flight.arrival.time); // 2004-09-23 10:42

try {
  console.log(flight.nonExistent); // undefined
  console.log(flight.departure.nonExistent); // undefined

  // throws "TypeError" since it cannot read a property of an undefined variable
  // in the above examples, flight.nonExistent returns undefined since flight
  // has been defined as an object. The property nonExistent hasn't been assigned
  // so no error is thrown, however when trying to access a property of an undefined
  // variable/property results in a "TypeError: Cannot read properties of undefined (reading '{propertyInQuestion}')"
  console.log(flight.nonExistent.departure); // throws "TypeError: Cannot read properties of undefined (reading 'departure')"
} catch (errorMsg) {
  console.error(errorMsg);
}

try {
  // here's another example
  const exists = {}; // define
  console.log(exists); // {}

  // undefined - since exists has been defined but not the nonExistent property
  // again the error thrown is not for the property being undfined but of trying
  // to access a property of an undfined variable in this case exists.
  console.log(exists.nonExistent); // undefined

  // "TypeError: Cannot read properties of undefined (reading 'isHelping')"
  // "Cannot read properties of undefined" refers to the 'variable/property' - in this case exists.nonExistent
  // "(reading 'isHelping')" refers to the property (isHelping) of the 'undefined' (exists.nonExistent)
  console.log(exists.nonExistent.isHelping); // throws "TypeError"
} catch (errorMsg) {
  console.error(errorMsg);
}

try {
  // here's another example
  const exists = {}; // define
  console.log(exists); // {}
  console.log(exists.nonExistent); // undefined

  exists.nonExistent = {}; // define

  console.log(exists.nonExistent); // {}

  console.log(exists.nonExistent.isHelping); // undefined

  // "TypeError: Cannot read properties of undefined (reading 'truthyFalsey')"
  // "Cannot read properties of undefined" refers to the 'variable/property' - in this case exists.nonExistent.isHelping
  // "(reading 'isHelping')" refers to the property (truthyFalsey) of the 'undefined' (exists.nonExistent.isHelping)
  console.log(exists.nonExistent.isHelping.truthyFalsey); // throws "TypeError"
} catch (errorMsg) {
  console.error(errorMsg);
}

// use || operator to substitute values where undefined to prevent errors
const middle = stooge['middle-name'] || 'none';
const flightStatus = flight.status || 'unknown';

console.log(middle); // none
console.log(flightStatus); // unknown

// use && to check for object before attempting to retrieve it's property
console.log(flight.status && flight.status.nonExistent); // undefined

try {
  // throws error because flight.status is undefined so nonExistent coulnd't possibly be
  console.log(flight.status.nonExistent); // throws "TypeError"
} catch (errorMsg) {
  console.error(errorMsg);
}

console.groupEnd('Retrieval');

/**********
 * Update *
 **********/
console.groupCollapsed('Update');

console.log(stooge['first-name']); // Lord
stooge['first-name'] = 'lord'; // update - if property exists, then update with value
console.log(stooge['first-name']); // lord

console.log(stooge['middle-name']); // undefined
stooge['middle-name'] = 'lee'; // define - if property doesn't exist, then define it with value
console.log(stooge['middle-name']); // lee

stooge.nickname = '(the phantom)'; // define and assign

console.log(`${stooge['first-name']} ${stooge['middle-name']} ${stooge.nickname} ${stooge['last-name']}`); // lord lee (the phantom) Savith

console.log(flight.status); // undefined
flight.status = 'overdue';
console.log(flight.status); // overdue

console.log(flight.equipment); // undefined
flight.equipment = {};
console.log(flight.equipment); // {}

// DON'T FORGET TO PROTECT!!!! or try/catch it!!!!
console.log(flight.equipment && flight.equipment.model); // undefined
flight.equipment.model = 'Boeing 777'; // define
console.log(flight.equipment && flight.equipment.model); // Boeing 777

console.groupEnd('Update');

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

/**************
 * Reflection *
 **************/
console.groupCollapsed('Reflection');

// typeof will look at the prototype chain for this property and can produce a value
console.log(typeof flight.number); // number
console.log(typeof flight.status); // string
console.log(typeof flight.arrival); // object
console.log(typeof flight.manifest); // undefined
console.log(typeof flight.toString); // function
console.log(typeof flight.constructor); // function

// hasOwnProperty() does NOT look at the prototype chain, therefore 'constructor' & 'toString' are false and 'number' & 'status' are true
// the 'constructor' property is owned by the prototype which is why the above (ln: 355) returns 'function'
console.log(flight.hasOwnProperty('number')); // true
console.log(flight.hasOwnProperty('constructor')); // false
console.log(flight.hasOwnProperty('toString')); // false
console.log(flight.hasOwnProperty('status')); // true

console.groupEnd('Reflection');

/***************
 * Enumeration *
 ***************/
console.groupCollapsed('Enumeration');

// Enumeration: the action of mentioning a number of things one by one.
console.log('Enumeration: the action of mentioning a number of things one by one.');

// this will loop over all propeties, even those of the prototype, and in no particular order
// if that's not desired then you should filter out undesired values
// using hasOwnProperty() method with typeof will help filter out the prototype chain
let myName;
for (myName in another_stooge ) {
  if (typeof another_stooge[myName] !== 'function') {
    console.log(`${myName}: ${another_stooge[myName]}`);
  }
}

console.log('using an array to control order of names:');
let i;
let properties = [
  'first-name',
  'middle-name',
  'last-name',
  'profession'
];
// using a 'for' instead of a 'for in' we were able filter out any
//  values/properties from prototype chain
for (i = 0; i < properties.length; i++) {
  console.log(`${properties[i]}: ${another_stooge[properties[i]]}`);
}

console.groupEnd('Enumeration');

/**********
 * Delete *
 **********/
console.groupCollapsed('Delete');

// create new Object Literal
const deleteExample = {
  one: 'one',
  two: 2,
  makeAnExample: false
}

console.log('delete example: ', deleteExample); // {one: 'one', two: 2, makeAnExample: false}

const newExample = Object.create(deleteExample); // create prototype because of line 323

console.log('newExample before Linking: ', newExample); // {}

newExample.one = 1; // create property - which links to prototype
newExample.two = 'two'; // create property - which links to prototype
newExample.makeAnExample = 'maybe?'; // create property - which links to prototype

console.log('newExample after Linking: ', newExample); // {one: 1, two: 'two', makeAnExample: 'maybe?'}

delete newExample.one; // delete property on prototype's child

console.log('newExample after deleting: ', newExample); // {two: 'two', makeAnExample: 'maybe?'}
// PROTOTYPES ARE FOR RETRIEVAL ONLY
console.log('newExample.one after deleting: ', newExample.one); // 'one'

deleteExample.makeAnExample = true; 

console.log('delete example: ', deleteExample); // {one: 'one', two: 2, makeAnExample: true}
console.log('newExample after after: ', newExample); // {two: 'two', makeAnExample: 'maybe?'}
console.log('newExample.makeAnExample: ', newExample.makeAnExample); // 'maybe?'

delete newExample.makeAnExample; // delete property on prototype's child

console.log('newExample.makeAnExample after deletion: ', newExample.makeAnExample); // true

const newExampleWithoutPrototype = deleteExample; // create object reference

console.log('newExampleWithoutPrototype before Linking: ', newExampleWithoutPrototype); // {}

newExampleWithoutPrototype.one = 1; // create property - which links to prototype
newExampleWithoutPrototype.two = 'two'; // create property - which links to prototype
newExampleWithoutPrototype.makeAnExample = 'maybe?'; // create property - which links to prototype

console.log('newExampleWithoutPrototype after Linking: ', newExampleWithoutPrototype); // {one: 1, two: 'two', makeAnExample: 'maybe?'}

delete newExampleWithoutPrototype.one; // delete property on prototype's child

console.log('newExampleWithoutPrototype after deleting: ', newExampleWithoutPrototype); // {two: 'two', makeAnExample: 'maybe?'}
// PROTOTYPES ARE FOR RETRIEVAL ONLY - and this is a reference, not a prototype so it returns undefined
console.log('newExampleWithoutPrototype.one after deleting: ', newExampleWithoutPrototype.one); // undefined

deleteExample.makeAnExample = true; 

console.log('delete example: ', deleteExample); // {one: 'one', two: 2, makeAnExample: true}
console.log('newExampleWithoutPrototype after after: ', newExampleWithoutPrototype); // {two: 'two', makeAnExample: 'maybe?'}
console.log('newExampleWithoutPrototype.makeAnExample: ', newExampleWithoutPrototype.makeAnExample); // true

delete newExampleWithoutPrototype.makeAnExample; // delete property on prototype's child

console.log('newExampleWithoutPrototype.makeAnExample after deletion: ', newExampleWithoutPrototype.makeAnExample); // undefined

console.groupEnd('Delete');

console.groupEnd('Ch3 - Objects');
