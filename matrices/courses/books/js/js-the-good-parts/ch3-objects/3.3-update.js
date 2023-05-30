'use strict';

/**********
 * Update *
 **********/
console.groupCollapsed('Update');

console.log(stooge['first-name']); // Lord
stooge['first-name'] = 'lord'; // update - if property exists, then update with value
console.log(stooge['first-name']); // lord

console.log(stooge['middle-name']); // undefined
stooge['middle-name'] = 'lee'; // define - if property doesn't exist, then define it with value
console.log(stooge['middle-name']); // lee

stooge.nickname = '(the phantom)'; // define and assign

console.log(`${stooge['first-name']} ${stooge['middle-name']} ${stooge.nickname} ${stooge['last-name']}`); // lord lee (the phantom) Savith

console.log(flight.status); // undefined
flight.status = 'overdue';
console.log(flight.status); // overdue

console.log(flight.equipment); // undefined
flight.equipment = {};
console.log(flight.equipment); // {}

// DON'T FORGET TO PROTECT!!!! or try/catch it!!!!
console.log(flight.equipment && flight.equipment.model); // undefined
flight.equipment.model = 'Boeing 777'; // define
console.log(flight.equipment && flight.equipment.model); // Boeing 777

console.groupEnd('Update');
