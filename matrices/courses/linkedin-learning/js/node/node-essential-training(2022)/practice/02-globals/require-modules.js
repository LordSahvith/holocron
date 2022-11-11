// globally
console.log('dir: ', __dirname);
console.log('file: ', __filename);

// core module
const path = require('path');

console.log('file: ', path.basename(__filename));

for (let key in global) {
    console.log('global: ', key);
}
