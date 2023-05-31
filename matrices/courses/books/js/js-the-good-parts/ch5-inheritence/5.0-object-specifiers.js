'use strict';

/*********************
 * Object Specifiers *
 *********************/
console.groupCollapsed('Object Specifiers');

const makerNoObjectSpecifier = (name, title, powerLevel) => {
  console.log('name:', name);
  console.log('title:', title);
  console.log('power level:', powerLevel);
};

const objectNoSpecified = makerNoObjectSpecifier('savith', 'lord', 9000);


// if you don't know all the parameters, use an object specifier
// to extract data
const makerObjectSpecifier = (obj) => {
  console.log('name:', obj.name);
  console.log('title:', obj.title);
  console.log('power level:', obj.powerLevel);
  console.log('home world:', obj.homeWorld);
};

const objectSpecified = makerObjectSpecifier({
  name: 'savith',
  title: 'lord', 
  powerLevel: 9000,
  homeWorld: 'Dromound Kass'
});

console.groupEnd('Object Specifiers');
