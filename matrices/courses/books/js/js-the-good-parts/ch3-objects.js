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

console.groupEnd('Ch3 - Objects');
