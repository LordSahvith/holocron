'use strict';

/**********
 * Delete *
 **********/
console.groupCollapsed('Delete');

console.log('numbers before deletion:', numbers); // ['zero', 'one', 'two', 'shi', 'go']
delete numbers[3];
console.log('numbers after deletion:', numbers); // ['zero', 'one', 'two', empty, 'go']

numbers.splice(3, 1);
console.log('numbers after splice:', numbers); // ['zero', 'one', 'two', 'go']

console.groupEnd('Delete');
