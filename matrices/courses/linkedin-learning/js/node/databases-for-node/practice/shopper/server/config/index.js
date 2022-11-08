const pkg = require('../../package.json');

module.exports = {
    applicationName: pkg.name,
    mongoDB: {
        url: 'mongodb://localhost:27017/shopper'
    }
};
