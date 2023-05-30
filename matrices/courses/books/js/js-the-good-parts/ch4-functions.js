'use strict'; // changes behavior - ie. 'this' becomes undefined if not specified

// helpers
function add(a, b) {
  return a + b;
}

console.groupCollapsed('Ch4 - Functions');

/*******************
 * Base Invocation *
 *******************/
console.groupCollapsed('Base Invocation');

/**
 * Invocation - passed arguments + `this` & `arguments`
 * @param {*} one - anything
 * @param {*} two - anything
 * @param {Object} this - determined by invocation pattern (method, function, constructor or apply
 * @param {Array} arguments - existing properties passed from calee invocation
 */
function baseInvocation(one, two, that) {
  console.log('one: ', one); // came from foo.three
  console.log('two: ', two); // came from foo.four
  console.log('this: ', that); // depends on platform (ie. web, server, etc.) or if strict mode is active
  console.log('arguments: ', arguments); // parameters from foo() declaration which are passed in by foo() invocation arguments
  console.log('three: ', arguments[0]); // 'first'
  console.log('four: ', arguments[1]); // 'second'
}

function foo(one, two, globalObj) {
  const three = one;
  const four = two;
  const that = globalObj;
  baseInvocation(three, four, that); // arguments are passed through as array - [one, two]
}

const globalObj = this; // EDUCATIONAL PURPOSES, NOT RECOMMENDED - passing the global object is a security risk, just showing use case for strict mode
foo('first', 'second', globalObj);

console.groupEnd('Base Invocation');

/*****************************
 * Method Invocation Pattern *
 *****************************/
console.groupCollapsed('Method Invocation');

const myObject = {
  value: 0,
  increment: function (inc) {
    this.value += typeof inc === 'number' ? inc : 1;
  },
};

myObject.increment();
console.log(myObject.value); // 1

myObject.increment(2);
console.log(myObject.value); // 3

console.groupEnd('Method Invocation');

/*******************************
 * Function Invocation Pattern *
 *******************************/
console.groupCollapsed('Function Invocation');

/**
 * here with Function Invocation Patter, 'this' gets assinged to the global function - not a desired result (a bit of a flaw in the design)
 * the workaround for this is explained a bit further down (line: 88 - when we assign 'this' to 'that)
 */
const immediateInvocation = add(3, 4); // gets invoked immediately since it's not a property and has parentheses () (function invocation pattern)

console.log('immediateInvocation: ', immediateInvocation); // 7 - returns the result since it was invoked on creation (line 68)

/**
 * assign the add() function but does not run until invoked
 * (i.e. parentheses () are appended)
 * or, if it's a property, not until method invocation (starts line: 43)
 * (i.e. dot (Object.whatever()) or subscript (Object[{whatever}]) expressions)
 */
const notImmediateInvocation = add;

console.log('notImmediateInvocatin: ', add); // ƒ add(a, b) { return a + b; }
console.log('notImmediateInvocatin: ', add(4, 4)); // 8 - function invocation pattern

myObject.double = function () {
  const that = this; // workaround for this since this will be scoped to global object

  const helper = function () {
    that.value += add(that.value, that.value);
  };

  const helper2 = function () {
    console.log('i am here');
    // because of function invocation `this` is scoped globally (where it's used determines the object - ex. web, server, etc.) and not myObject
    // this will fail and throw an error (in strict mode)
    this.value += add(this.value, this.value); // TypeError: Cannot read property 'value' of undefined
  };

  helper(); // Invoke helper as a function

  try {
    helper2(); // Invoke helper2 as a function and wrap in try/catch cuz it WILL fail
  } catch (error) {
    // TypeError: Cannot read property 'value' of undefined
    console.error(error);
  }
};

myObject.double(); // Invoke double as a method
console.log(myObject.value); // 9 : (3 += (3 + 3) = 9)

// Method Invocation conversion - not relying on internal helper() function call to scope `this` to myObject
myObject.doubleMethod = function () {
  this.value += add(this.value, this.value);
};

myObject.doubleMethod(); // Invoke doubleMethod as a method
console.log(myObject.value); // 27 : (9 += (9 + 9) = 27)

console.groupEnd('Function Invocation');

/**********************************
 * Constructor Invocation Pattern *
 **********************************/
console.groupCollapsed('Constuctor Invocation');

const Quo = function (string) {
  this.status = string;
};

// Give all instances of Quo a public method
// called get_status
Quo.prototype.get_status = function () {
  return this.status;
};

// Make an instance of Quo
const myQuo = new Quo('confused');
console.log(myQuo.get_status()); // confused

const myQuo2 = new Quo('still confused');
console.log(myQuo2.get_status()); // still confused

myQuo2.get_status = function () {
  // overwrite get_status for myQuo2 instance only
  return this.status + " and you've been overwritten";
};

myQuo2.set_status = function (string) {
  // add to myQuo2 instance
  this.status = string;
};

// since set_status was only set on myQuo2 and not the prototype,
// myQuo doesn't have access to set_status
try {
  myQuo.set_status('am I confused');
} catch (error) {
  // ERROR: Uncaught TypeError: myQuo.set_status is not a function
  console.error(error);
}

myQuo2.set_status('no longer confused');
console.log(myQuo.get_status()); // confused
console.log(myQuo2.get_status()); // no longer confused and you've been overwritten

console.groupEnd('Constuctor Invocation');

/****************************
 * Apply Invocation Pattern *
 ****************************/
console.groupCollapsed('Apply Invocation');

// make an array of 2 numbers and add them
const array = [3, 4];
const sum = add.apply(null, array);
console.log(sum); // 7

// Make an object with a status member
const statusObject = {
  status: 'A-OK',
};
// statusObject does not inherit from Quo.prototype
// but we can invoke the get_status method on
// statusObject even though statusObject does not have
// a get_status method
const status1 = Quo.prototype.get_status.apply(statusObject);
console.log(status1); // A-OK
const status2 = myQuo2.get_status.apply(statusObject);
console.log(status2); // A-OK and you've been overwritten

console.groupEnd('Apply Invocation');

/*************
 * Arguments *
 *************/
console.groupCollapsed('Arguments');

/**
 * Arguments Array: a bonus parameter that is available when a function is invoked
 * caveat: this is a work around and doens't work with ES6 arrow functions - which is the preferred and modern way
 */
const argumentsExample = function () {
  console.log('arguments: ', arguments);
};

argumentsExample(); // [callee: (...), Symbol(Symbol.iterator): ƒ, ...]
argumentsExample('a', 'two', 3); // ['a', 'two', 3, callee: (...), Symbol(Symbol.iterator): ƒ, ...]

/**
 * ES6 sorta solves this with a rest parameter, however,
 * this doesn't have the extra data as a function invocation pattern
 * and isn't the true Arguments Array
 */
const argumentsArrowExample = (...args) => {
  console.log('arrow: ', args);
};

argumentsArrowExample(); // []
argumentsArrowExample('a', 'two', 3); // ['a', 'two', 3]

// book example
const sumArray = function () {
  let i;
  let sumDeclared; // just declaring will cause variable to be NaN
  let sum = 0; // make sure to define your variable by assigning a value

  for (i = 0; i < arguments.length; i++) {
    console.log('array: ', arguments[i], typeof arguments[i]);
    sum += arguments[i];
    sumDeclared += arguments[i];
  }

  return { sum, sumDeclared };
};

console.log('sum: ', sumArray(1, 2, 3, 4, 5, 6, 7, 8, 9)); // {sum: 45, sumDeclared: NaN}

// arrow conversion - this is the preferred way
const sumArrayArrow = (...args) => {
  let i;
  let sumDeclared; // just declaring will cause variable to be NaN
  let sum = 0; // make sure to define your variable by assigning a value

  for (i = 0; i < args.length; i++) {
    console.log('array: ', args[i], typeof args[i]);
    sum += args[i];
    sumDeclared += args[i];
  }

  return { sum, sumDeclared };
};

console.log('sum Arrow: ', sumArrayArrow(1, 2, 3, 4, 5, 6, 7, 8, 9)); // {sum: 45, sumDeclared: NaN}

console.groupEnd('Arguments');

/**********
 * Return *
 **********/
console.groupCollapsed('Return');

const returnFunction1 = function () {
  console.log('I get logged.');
  return; // returns exit block of code immediately and not code is executed after inside the block
  console.log('but I do not');
};

returnFunction1();

const testReturn1 = returnFunction1();

console.log('test return 1: ', testReturn1); // undefined - functions always return a value, even when there isn't a return, in this case, undefined is returned

const returnFunction2 = function () {
  return 'the truth is out there!'; // returns exit block of code immediately and not code is executed after inside the block
};

console.log('test with value: ', returnFunction2()); // the truth is out there!

const ReturnFunction3 = function (first, last) {
  this.first = first;
  this.last = last;

  return true; // don't pass an object, so 'this' (the new object) will be returned
};

const testReturn3 = new ReturnFunction3('lord', 'savith'); // when a 'new' prefix is used and the return value isn't an object, then 'this' (the new object) will be returned
console.log('test return: ', testReturn3); // { first: 'lord', last: 'savith' }

console.groupEnd('Return');

/**************
 * Exceptions *
 **************/
console.groupCollapsed('Exceptions');

const addException = function (a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw {
      name: 'TypeError',
      message: 'add needs numbers',
    };
  }

  return a + b;
};

const try_it = function () {
  try {
    addException('seven');
  } catch (e) {
    console.log(`${e.name}: ${e.message}`);
  }
};

try_it();

console.groupEnd('Exceptions');

/********************
 * Augmenting Types *
 ********************/
console.groupCollapsed('Augmenting Types');

Function.prototype.method = function (name, func) {
  this.prototype[name] = func;
  return this;
};

Number.method('integer', function () {
  return Math[this < 0 ? 'ceil' : 'floor'](this);
});

console.log((-10 / 3).integer()); // -3
console.log((10 / -3).integer()); // -3
console.log((10 / 3).integer()); // 3
console.log((10).integer()); // 10
console.log((10 * 4).integer()); // 40

String.method('trim', function () {
  return this.replace(/^\s+|\s+$/g, '');
});

console.log(' neat '.trim(), ''); // neat

// conditionally set the method of it's not there
// this helps prevent cross library discrepancies
Function.prototype.method2 = function (name, func) {
  if (!this.prototype[name]) {
    this.prototype[name] = func;
    return this;
  }
};

console.groupEnd('Augmenting Types');

/*************
 * Recursion *
 *************/
console.groupCollapsed('Recursion');

const hanoi = function hanoi(disc, src, aux, dst) {
  if (disc > 0) {
    hanoi(disc - 1, src, dst, aux);
    console.log(`Move disc ${disc} from ${src} to ${dst}`);
    hanoi(disc - 1, aux, src, dst);
  }
};

hanoi(3, 'Src', 'Aux', 'Dst');

/**
 * Defines a function that visits every
 * node of the tree in HTML source order,
 * starting from some given node. It invokes
 * a function, passing it each node in turn.
 * walk_the_DOM calss itself to process each
 * of the child nodes
 */
const walk_the_DOM = function walk(node, func) {
  func(node);
  node = node.firstChild;
  while (node) {
    walk(node, func);
    node = node.nextSibling;
  }
};

/**
 * Takes an attributre name string and an optional
 * matching value. It calls walk_the_DOM, passing it
 * a function that looks for an attribute name in the
 * node. The matching nodes are accumulated in a
 * results array
 */
const getElementsByAttribute = function (att, value) {
  const results = [];

  walk_the_DOM(document.body, function (node) {
    const actual = node.nodeType === 1 && node.getAttribute(att); // returns string if present, otherwise false
    if (typeof actual === 'string' && (actual === value || typeof value !== 'string')) {
      // || typeof value handles optional parameter
      console.log('node: ', node); // matching node
      console.log('actual: ', actual); // attribute's value
      results.push(node);
    }
  });

  return results;
};

console.log('data-test: ', getElementsByAttribute('data-test', 'in control')); // [h1.heading1]
console.log('class: ', getElementsByAttribute('class')); // [h1.heading1, p.paragraph, p.paragraph.two]
console.log('class two: ', getElementsByAttribute('class', 'paragraph two')); // [p.paragraph.two]

const classes = getElementsByAttribute('class');
console.log('retrieve value: ', classes[2].getAttribute('class')); // paragraph two

const factorial = function factorial(i, a) {
  a = a || 1;
  if (i < 2) {
    return a;
  }
  return factorial(i - 1, a * i);
};

console.log('js does not support tail recursion: ', factorial(4)); // 24

console.groupEnd('Recursion');

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

/***********
 * Closure *
 ***********/
console.groupCollapsed('Closure');

const myObjectClosure = (function () {
  let value = 0;

  return {
    increment: inc => {
      value += typeof inc === 'number' ? inc : 1; // JS keeps value alive as long as it's needed for this function - closure
    },
    getValue: () => {
      return value;
    },
  };
})(); // () at end invokes the anonymous function

console.log('myObjectClosure: ', myObjectClosure); // {increment: ƒ, getValue: ƒ}
console.log('myObjectClosure.getValue(): ', myObjectClosure.getValue()); // 0
console.log('myObjectClosure.increment(): ', myObjectClosure.increment()); // undefined
console.log('myObjectClosure.getValue(): ', myObjectClosure.getValue()); // 1
console.log('myObjectClosure: ', myObjectClosure); // {increment: ƒ, getValue: ƒ}

/**
 * create a maker function called quo. it makes an
 * object with a get_status method and a private
 * status property
 */
const quoClosure = status => {
  return {
    get_status: () => {
      return status;
    },
  };
};

// make an instance of quo
const myQuoClosure = quoClosure('closure is pretty cool');
console.log('myQuoClosure.get_status: ', myQuoClosure.get_status()); // closure is pretty cool

// set DOM node color to yellow and fade to white
const fade = node => {
  let level = 1;
  const step = () => {
    let hex = level.toString(16);
    node.style.backgroundColor = '#FFFF' + hex + hex;
    if (level < 15) {
      level += 1;
      setTimeout(step, 100);
    }
  };
  setTimeout(step, 100);
};

fade(document.body);

console.groupEnd('Closure');

/*************
 * Callbacks *
 *************/
console.groupCollapsed('Callbacks');

const apiURL = 'https://pokeapi.co/api/v2/pokemon/charmander';
const response = fetch(apiURL)
  .then(blob => blob.json())
  .then(json => console.log('callback (async): ', json)) // {abilities: Array(2), base_experience: 62, forms: Array(1), game_indices: Array(20), height: 6, …}
  .catch(e => console.log(e.message));

console.log('no callback (sync): ', response); // in frozen state. response pending since it did not wait for server response

console.groupEnd('Callbacks');

/**********
 * Module *
 **********/
console.groupCollapsed('Module');

String.method('deentityify', function () {
  // the entity table maps entity names to characters
  const entity = {
    quot: '"',
    lt: '<',
    gt: '>',
    trade: '™'
  };

  // return the deentityify method
  return function () {
    /**
     * this is the deentityify method. it calls the string
     * replace method, looking for substrings that start
     * with '&' and end with ';'. if the characters in
     * between are in the entity table, then replace the
     * entity with the character from the table. it uses
     * regular expression (chapter 7).
     */
    return this.replace(/&([^&;]+);/g, function (a, b) {
      // console.log('a:', a);
      // console.log('b:', b);
      const r = entity[b];
      return typeof r === 'string' ? r : a;
    });
  };
}());

console.log('module: ', '&lt;&quot;&gt;'.deentityify()); // <">
console.log('module: ', '&lt;&quot;&gt;&reg;'.deentityify()); // <">&reg;
console.log('module: ', '&lt;&quot;&gt;&reg;&trade;'.deentityify()); // <">&reg;™

const serial_maker = function () {
  /**
   * product an object that produces unique strings. A
   * unique string is made up of two parts: a prefix
   * and a sequence number. the object comes with 
   * methods for setting the prefix and sequence
   * number, and a gensym method that produces unique
   * stings.
   */
  let prefix = '';
  let seq = 0;
  return {
    set_prefix: function (p) {
      prefix = String(p);
    },
    set_seq: function (s) {
      seq = s;
    },
    gensym: function () {
      const result = prefix + seq;
      seq += 1;
      return result;
    }
  };
};

const seqer = serial_maker();
seqer.set_prefix('Q');
seqer.set_seq(1000);
const uniqueArray = [];

for (let i = 0; i < 5; i++) {
  uniqueArray.push(seqer.gensym());
}

console.log('unique: ', uniqueArray); // ['Q1000', 'Q1001', 'Q1002', 'Q1003', 'Q1004']

console.groupEnd('Module');

/*********
 * Curry *
 *********/
console.groupCollapsed('Curry');

Function.method('curry', function () {
  const slice = Array.prototype.slice;
  const args = slice.apply(arguments);
  const that = this;

  return function () {
    return that.apply(null, args.concat(slice.apply(arguments)));
  };
});

const add1 = add.curry(1);
console.log('add1: ', add1(6));

console.groupEnd('Curry');

console.groupEnd('Ch4 - Functions');
