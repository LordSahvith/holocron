'use strict';

/*********
 * Scope *
 *********/
console.groupCollapsed('Scope');

// fucntion scope
const scopeFu = () => {
  const functionScope = "this is scoped to this function unless it's passed to another function";
  console.log('function scope (in): ', functionScope); // 'this is scoped to this function unless it's passed to another function'

  const scopeFoo = () => {
    console.log('function scope (in - in): ', functionScope); // 'this is scoped to this function unless it's passed to another function'
    const innerFunctionScope = 'scoped here and to "decending" code';
    console.log('inner: ', innerFunctionScope); // scoped here and to "decending" code
  };

  try {
    console.log('outer: ', innerFunctionScope); // Uncaught ReferenceError: innerFunctionScope is not defined
  } catch (e) {
    console.error('outer: ', e.message); // innerFunctionScope is not defined
  }

  scopeFoo();
};

scopeFu();

// block scope
var everywhereVar = 'vars are global with block scope';
let everywhereLet = 'lets are global to inner blocks but not outer';
const everywhereConst = 'consts are global to inner blocks but not outer';

console.log('outer global var: ', everywhereVar);
console.log('outer global let: ', everywhereLet);
console.log('outer global const: ', everywhereConst);

if (true) {
  console.log('inner global var: ', everywhereVar);
  console.log('inner global let: ', everywhereLet);
  console.log('inner global const: ', everywhereConst);
  var blockVar = 'vars are global with block scope';
  let blockLet = 'lets are global to inner blocks but not outer';
  const blockConst = 'consts are global to inner blocks but not outer';
  console.log('inner block var: ', blockVar); //vars are global with block scope
  console.log('inner block let: ', blockLet); // lets are global to inner blocks but not outer
  console.log('inner block const: ', blockConst); // consts are global to inner blocks but not outer
}

console.log('inner block var: ', blockVar); // vars are global with block scope

try {
  console.log('inner block let: ', blockLet); // Uncaught ReferenceError: blockLet is not defined
} catch (e) {
  console.error('outer: ', e.message); // blockLet is not defined
}

try {
  console.log('inner block const: ', blockConst); // Uncaught ReferenceError: blockConst is not defined
} catch (e) {
  console.error('outer: ', e.message); // blockConst is not defined
}

console.groupEnd('Scope');
