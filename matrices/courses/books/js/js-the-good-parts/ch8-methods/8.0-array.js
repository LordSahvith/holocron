'use strict';

/*********
 * Array *
 *********/
console.groupCollapsed('Array');

const ARRAY1 = ['a', 'b', 'c'];
const ARRAY2 = ['x', 'y', 'z'];

console.groupCollapsed('concat()');
const concat1 = ARRAY1.concat();
const concat2 = ARRAY2.concat();
const concat3 = concat1.concat(concat2);
const concat4 = concat3.concat('new entry', 'another', true);
console.log('concat1:', concat1); // ['a', 'b', 'c']
console.log('concat2:', concat2); // ['x', 'y', 'z']
console.log('concat3:', concat3); // ['a', 'b', 'c', 'x', 'y', 'z']
console.log('concat4:', concat4); // ['a', 'b', 'c', 'x', 'y', 'z', 'new entry', 'another', true]

concat1.push('concat is a shallow copy');
concat2.push('meaning that it\'s not being referenced');
console.log('concat1:', concat1); // ['a', 'b', 'c', 'concat is a shallow copy']
console.log('concat2:', concat2); // ['x', 'y', 'z', "meaning that it's not being referenced"]
console.log('concat3:', concat3); // ['a', 'b', 'c', 'x', 'y', 'z']
console.log('concat4:', concat4); // ['a', 'b', 'c', 'x', 'y', 'z', 'new entry', 'another', true]
console.groupEnd('concat()');

console.groupCollapsed('join()');
const join1 = ARRAY1.concat();
console.log('join1:', join1); // ['a', 'b', 'c']
join1.push('d');
const join2 = join1.join('');
console.log('join2:', join2); // abcd
console.groupEnd('join()');

console.groupCollapsed('pop()');
console.groupEnd('pop()');

console.groupCollapsed('push()');
console.groupEnd('push()');

console.groupCollapsed('reverse()');
console.groupEnd('reverse()');

console.groupCollapsed('shift()');
console.groupEnd('shift()');

console.groupCollapsed('slice()');
console.groupEnd('slice()');

console.groupCollapsed('sort()');
console.groupEnd('sort()');

console.groupCollapsed('splice()');
console.groupEnd('splice()');

console.groupCollapsed('unshift()');
console.groupEnd('unshift()');

console.groupEnd('Array');
