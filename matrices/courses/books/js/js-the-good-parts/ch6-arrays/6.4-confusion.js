'use strict';

/*************
 * Confusion *
 *************/
console.groupCollapsed('Confusion');

const array1 = [];

const is_array_1 = function (value) {
  return value && typeof value === 'object' && value.constructor === Array;
};

console.log('is array1 an array:', is_array_1(array1));
console.log('is numbers an array:', is_array_1(numbers));

const response2 = fetch(apiURL)
  .then(blob => blob.json())
  .then(json => console.log('ch6.4 - confusion: ', is_array_1(json.forms))) // true
  .catch(e => console.log(e.message));

console.groupEnd('Confusion');
