const path = require('path');
const util = require('util');
const { log } = require('util'); // not best practice to deconstruct from require()
const { getHeapStatistics } = require('v8');

const fullPath = path.join(__dirname, 'www', 'files', 'uploads');

console.log('path: ', fullPath);

util.log(path.basename(__filename));
util.log(path.basename('^^ name of current file'));

log(getHeapStatistics());
