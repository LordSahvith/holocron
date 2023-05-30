'use strict';

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
