const planet = 'Earth';

console.log(planet.startsWith('ear')); // false
console.log(planet.startsWith('Ear')); // true
console.log(planet.endsWith('ths')); // false
console.log(planet.endsWith('th')); // true
console.log(planet.includes('z')); // false
console.log(planet.includes('h')); // true
console.log(planet.includes('Earth1')); // false
console.log(planet.search('art')); // 1 - index where it's found
console.log(planet.search('zoo')); // -1 - nothing is found
