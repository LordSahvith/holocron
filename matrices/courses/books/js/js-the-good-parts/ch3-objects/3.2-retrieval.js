'use strict';

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
