const path = require('path');
console.log(path.basename(__filename));
const dirUploads = path.join(__dirname, 'www', 'files', 'uploads');
console.log(dirUploads);

const util = require('util');
util.log(path.basename(__filename));

const v8 = require('v8');
util.log(v8.getHeapStatistics());
