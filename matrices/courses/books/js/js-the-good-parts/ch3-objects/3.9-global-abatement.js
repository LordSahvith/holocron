'use strict';

/********************
 * Global Abatement *
 ********************/
console.groupCollapsed('Global Abatement');

const MYAPP = {};

/**
 * instead of doing global variables, do a single global variable
 * to contain other variables to reduce unexpected results
 */
MYAPP.stooge = {
  firstName: 'Lord',
  lastName: 'Savith',
  nickname: 'Lord Savith',
};

console.log('stooge:', stooge); // {first-name: 'lord', last-name: 'Savith', first_name: 'lord', last_name: 'savith', middle-name: 'lee', …}
console.log('MYAPP.stooge:', MYAPP.stooge); // {firstName: 'Lord', lastName: 'Savith', nickname: 'Lord Savith'}

stooge.newProperty = 'this';
MYAPP.stooge.newProperty = 'that';

console.log('stooge.newProperty:', stooge.newProperty); // this
console.log('MYAPP.stooge.newProperty:', MYAPP.stooge.newProperty); // that

console.groupEnd('Global Abatement');
