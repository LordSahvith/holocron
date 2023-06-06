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
const pop1 = ARRAY1.concat();
console.log('pop1 before pop():', pop1); // ['a', 'b', 'c']
const pop2 = pop1.pop();
console.log('pop1 after pop():', pop1); // ['a', 'b']
console.log('pop2:', pop2); // c
console.groupEnd('pop()');

console.groupCollapsed('push()');
const push1 = ARRAY1.concat();
const push2 = ARRAY2.concat();

// push() modifies the array, in this case push1
// and returns the new length
const push3 = push1.push(push2, true);
console.log('push1:', push1); // ['a', 'b', 'c', Array(3), true]
console.log('push3:', push3); // 5
console.groupEnd('push()');

console.groupCollapsed('reverse()');
const reverse1 = ARRAY1.concat();
console.log('reverse1 before reverse():', reverse1); // ['a', 'b', 'c']
const reverse2 = reverse1.reverse(); // modifies and returns reference to array
console.log('reverse1 after reverse():', reverse1); // ['c', 'b', 'a']
console.log('reverse2:', reverse2); // ['c', 'b', 'a']
reverse2.push('d');
console.log('reverse1 after reverse2.push():', reverse1); // ['c', 'b', 'a']
console.log('reverse2 after reverse2.push():', reverse2); // ['c', 'b', 'a']
console.groupEnd('reverse()');

console.groupCollapsed('shift()');
const shift1 = ARRAY1.concat();
console.log('shift1 before shift():', shift1); // ['a', 'b', 'c']
const shift2 = shift1.shift(); // modifies and returns value
console.log('shift1 after shift():', shift1); // ['b', 'c']
console.log('shift2:', shift2); // 'a'
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
