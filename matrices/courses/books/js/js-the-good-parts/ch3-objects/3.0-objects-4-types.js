'use strict';

/**
 * 4 ways to create an Object in JS
 *   1. Object Literals
 *   2. Constructor Functions
 *   3. ECMAScript 6 classes
 *   4. Object.create() method
 */

console.groupCollapsed('4 types of objects');

/*******************
 * Object Literals *
 *******************/
console.groupCollapsed('Object Literals');

/**
 * objects produced using object literals creates a hidden link to Object.prototype
 * (prototypes will be covered more in chapters 4 & 5)
 */

const empty_object_literal = {}; // simplest object
const object_literal = {
  one: 'one',
  two: 'two',
};

console.log('empty object: ', empty_object_literal);
console.log('object: ', object_literal);

console.groupEnd('Object Literals');

/*************************
 * Constructor Functions *
 *************************/
console.groupCollapsed('Constructor Functions');

function User(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}
console.log(User);

const myUser = new User('Lord', 'Savith');
console.log('Object: ', myUser);

console.groupEnd('Constructor Functions');

/**********************
 * ECMAScript 6 Class *
 **********************/
console.groupCollapsed('ECMAScript 6 Class');

console.groupCollapsed('Declaration');
class Person1 {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  printName() {
    console.log(`${this.firstName} ${this.lastName}`);
  }
}
console.log(Person1);

const myPerson1 = new Person1('Lord', 'Savith');
console.log('Object:', myPerson1);
myPerson1.printName(); // Lord Savith

console.groupEnd('Declaration');

console.groupCollapsed('Expression');

const Person2 = class {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  printName() {
    console.log(`${this.firstName} ${this.lastName}`);
  }
};
console.log(Person2);

const myPerson2 = new Person2('Lord', 'Savith');
console.log('Object:', myPerson2);
myPerson2.printName(); // Lord Savith

const Person3 = class Person4 {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  printName() {
    console.log(`${this.firstName} ${this.lastName}`);
  }
};
console.log(Person3);

const myPerson3 = new Person3('Lord', 'Savith'); // uses variable Person3 but myPerson3 becomes an instantiation of Person4 Class
console.log('Object:', myPerson3);
myPerson3.printName(); // Lord Savith

console.groupEnd('Expression');

console.groupEnd('ECMAScript 6 Class');

/*******************
 * Object.create() *
 *******************/
console.groupCollapsed('Object.create()');

const myNewPerson = {
  jsIsOddButCool: true,
  otherCoolThings: function () {
    // declarative
    if (this.name && this.jsIsOddButCool) {
      console.log(`My name is ${this.name}. Pretty cool.`);
    } else {
      console.log(`Sorry you haven't been given a name yet. That's like 60% less cool: ${this.jsIsOddButCool}`);
    }
  },
  otherCoolThingsWithES6() {
    // ES6
    if (this.name && this.jsIsOddButCool) {
      console.log(`My name is ${this.name}. Pretty cool.`);
    } else {
      console.log(`Sorry you haven't been given a name yet. That's like 60% less cool: ${this.jsIsOddButCool}`);
    }
  },
  notSoCoolThings: () => console.log(`Arrow functions have 'this' bound? ${this.jsIsOddButCool}`),
  howToUseArrowFunctionWithThis: () => console.log("Just don't. Use a declarative or ES6 function instead."),
};
console.log(myNewPerson);

const myNewPerson1 = Object.create(myNewPerson);
console.log('myNewPerson1: ', myNewPerson1);
myNewPerson1.otherCoolThings(); // Sorry you haven't been given a name yet. That's like 60% less cool: true

const myNewPerson2 = Object.create(myNewPerson);
myNewPerson2.name = 'Lord Savith';
console.log('myNewPerson2: ', myNewPerson2);
myNewPerson2.otherCoolThings(); // `My name is Lord Savith. Pretty cool.
myNewPerson2.otherCoolThingsWithES6(); // `My name is Lord Savith. Pretty cool.
myNewPerson2.notSoCoolThings(); // `Arrow functions have 'this' bound? undefined
myNewPerson2.howToUseArrowFunctionWithThis(); // Just don't. Use a declarative or ES6 function instead.

console.groupEnd('Object.create()');

console.groupEnd('4 types of objects');
