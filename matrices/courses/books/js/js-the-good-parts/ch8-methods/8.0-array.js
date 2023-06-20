'use strict';

/*********
 * Array *
 *********/
console.groupCollapsed('Array');

const ARRAY1 = ['a', 'b', 'c'];
const ARRAY2 = ['x', 'y', 'z'];
const ARRAY_NUM_1 = [5, 4, 2, 3, 1];
const ARRAY_NUM_2 = [15, 2, 24, 44, 69];
const ARRAY_MULTI_TYPE_1 = ['aa', 'bb', 'a', 'c', 88, 33, 55, 11, 0];
const ARRAY_OBJECTS_1 = [
  {first: 'Lord', last: 'Vader'},
  {first: 'sith', last: 'lord'},
  {first: 'ashoka', last: 'tanno'},
  {first: 'Lord', last: 'savith'},
];

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

const slice1 = ARRAY1.concat(); // shallow copy
const slice2 = slice1.slice(0, 1); // shallow copy
const slice3 = slice1.slice(1); // not a reference
const slice4 = slice1.slice(2, 3);

console.log('slice1:', slice1); // ['a', 'b', 'c']
console.log('slice2:', slice2); // ['a']
console.log('slice3:', slice3); // ['b', 'c']
console.log('slice4:', slice4); // ['c']

// since slice isn't a reference but a shallow copy it remains unmodified
console.log('slice1:', slice1); // ['a', 'b', 'c']

console.groupEnd('slice()');

console.groupCollapsed('sort()');

const sortNumbers1 = ARRAY_NUM_1.concat(); // [5, 4, 2, 3, 1]
const sortNumbers2 = ARRAY_NUM_2.concat(); // [15, 2, 24, 44, 69]
const sortNumbers3 = sortNumbers1.concat(sortNumbers2); // [5, 4, 2, 3, 1, 15, 2, 24, 44, 69]

// bad way to sort numbers since JS by default assumes strings
console.log('sortNumbers1 bad (lucky):', sortNumbers1.sort()); // [1, 2, 3, 4, 5] - lucky shot
console.log('sortNumbers2 bad:', sortNumbers2.sort()); // [15, 2, 24, 44, 69]
console.log('sortNumbers3 bad:', sortNumbers3.sort()); // [1, 15, 2, 2, 24, 3, 4, 44, 5, 69]

const sortNumbers4 = ARRAY_NUM_1.concat(); // [5, 4, 2, 3, 1]
const sortNumbers5 = ARRAY_NUM_2.concat(); // [15, 2, 24, 44, 69]
const sortNumbers6 = sortNumbers4.concat(sortNumbers5); // [5, 4, 2, 3, 1, 15, 2, 24, 44, 69]

// good way to sort numbers since we are passing in a function that compares numbers
// find sortNumbersFunc in ../helpers/arrays.js 
console.log('sortNumbers4 good:', sortNumbers4.sort(sortNumbersFunc)); // [1, 2, 3, 4, 5]
console.log('sortNumbers5 good:', sortNumbers5.sort(sortNumbersFunc)); // [2, 15, 24, 44, 69]
console.log('sortNumbers6 good:', sortNumbers6.sort(sortNumbersFunc)); // [1, 2, 2, 3, 4, 5, 15, 24, 44, 69]

// notice that when logged after sorting, it shows the  new order. that's becuase sorting
// changes the order of the array.
console.log('sortNumbers6 after sort:', sortNumbers6); // [1, 2, 2, 3, 4, 5, 15, 24, 44, 69]

const sortMulti1 = ARRAY_MULTI_TYPE_1.concat();

// find sortMultiFunc in ../helpers/arrays.js 
console.log('sortMulti1 before sort:', sortMulti1); // ['aa', 'bb', 'a', 'c', 88, 33, 55, 11, 0]
console.log('sortMulti1 after sort:', sortMulti1.sort(sortMultiFunc)); // [0, 11, 33, 55, 88, 'a', 'aa', 'bb', 'c']

const sortArrayObjects1 = ARRAY_OBJECTS_1.concat();
const sortArrayObjects2 = sortArrayObjects1.concat();
console.log('sortArrayObjects1 before sort:', sortArrayObjects1);
console.log('sortArrayObjects1 after sort:', sortArrayObjects2.sort(by('first')));

console.groupEnd('sort()');

console.groupCollapsed('splice()');

const spliceArray1 = ARRAY1.concat();
console.log('spliceArray1 before splice:', spliceArray1); // ['a', 'b', 'c']
const spliceArray2 = spliceArray1.splice(0, 1, 'bob', 'sheryl');
console.log('spliceArray1 after splice:', spliceArray1); // ['bob', 'sheryl', 'b', 'c']
console.log('spliceArray2:', spliceArray2); // ['a']

console.groupEnd('splice()');

console.groupCollapsed('unshift()');

const unshiftArray1 = ARRAY1.concat();
console.log('unshiftArray1 before shift:', unshiftArray1); // ['a', 'b', 'c']
const unshiftArray2 = unshiftArray1.unshift('1', 8);
console.log('unshiftArray1 after shift:', unshiftArray1); // ['1', 8, 'a', 'b', 'c']
console.log('unshiftArray2:', unshiftArray2); // 5

console.groupEnd('unshift()');

console.groupEnd('Array');
