'use strict';

/**********
 * Delete *
 **********/
console.groupCollapsed('Delete');

// create new Object Literal
const deleteExample = {
  one: 'one',
  two: 2,
  makeAnExample: false,
};

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
