'use strict';

/**************
 * Functional *
 **************/
console.groupCollapsed('Functional');

const functionalMammal = function (spec) {
  const that = {};

  that.get_name = function () {
    return spec.name;
  };

  that.says = function () {
    return spec.saying || '';
  };

  return that;
};

const myFunctionalMammal = functionalMammal({ name: 'Savith' });

console.log('get_name:', myFunctionalMammal.get_name()); // Savith
console.log('says:', myFunctionalMammal.says()); // ''

const myFunctionalMammal2 = functionalMammal({ name: 'Lord Savith', saying: 'Keeper of the keys.' });

console.log('get_name:', myFunctionalMammal2.get_name()); // Lord Savith
console.log('says:', myFunctionalMammal2.says()); // Keeper of the keys.

const functionalCat = function (spec) {
  spec.saying = spec.saying || 'meow';
  const that = functionalMammal(spec);

  that.purr = function (n) {
    let i;
    let s = '';
    for (i = 0; i < n; i++) {
      if (s) {
        s += '-';
      }
      s += 'r';
    }
    return s;
  };

  that.get_name = function () {
    return `${that.says()} ${spec.name} ${that.says()}`;
  };

  return that;
};

const myFunctionalCat = functionalCat({ name: 'bob', saying: 'meowser' });

console.log('cat get_name:', myFunctionalCat.get_name()); // meowser bob meowser
console.log('cat says:', myFunctionalCat.says()); // meowser
console.log('cat purr:', myFunctionalCat.purr(4)); // r-r-r-r

Object.method('superior', function (name) {
  const that = this;
  const method = that[name];
  return function () {
    return method.apply(that, arguments);
  };
});

const coolCat = function (spec) {
  const that = functionalCat(spec);
  const super_get_name = that.superior('get_name');

  that.get_name = function (n) {
    return `like ${super_get_name()} baby`;
  };
  
  return that;
};

const myCoolCat = coolCat( {name: 'Luna' });
const name = myCoolCat.get_name();
console.log(`my cool cat's name is ${name}`) // my cool cat's name is like meow Luna meow baby

console.groupEnd('Functional');
