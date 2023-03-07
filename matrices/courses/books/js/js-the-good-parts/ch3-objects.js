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
const empty_object_literal = {}; // simplest object
const object_literal = {
  one: 'one',
  two: 'two',
};

console.log(empty_object_literal);
console.log(object_literal);

// Constructor Functions
function User(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

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
} catch(errorMsg) {
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



console.groupEnd('Reference');

console.groupEnd('Ch3 - Objects');
