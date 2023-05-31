'use strict';

/**************
 * Prototypal *
 **************/
console.groupCollapsed('Prototypal');

const myMammal = {
  name: 'Herb the mammal',
  get_name: function () {
    return this.name;
  },
  says: function () {
    return this.saying || '';
  }
};

console.log('myMammal name:', myMammal.get_name()); // Herb the mammal
console.log('myMammal says:', myMammal.says()); // ''

const myCat = Object.create(myMammal);
myCat.name = 'whiskers';
myCat.saying = 'meow';
myCat.purr = function (n) {
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

myCat.get_name = function () {
  return `${this.says()} ${this.name} ${this.says()}`;
};

console.log('get name:', myCat.get_name()); // meow whiskers meow
console.log('purr:', myCat.purr(4)); // r-r-r-r

console.groupEnd('Prototypal');
