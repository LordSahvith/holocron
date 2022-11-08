const pkg = require('../../package.json');

module.exports = {
    applicationName: pkg.name,
    mongoDB: {
        url: 'mongodb://localhost:27017/shopper'
    },
    redis: {
        port: 7379,
        client: null
    },
    mysql: {
        options: {
            host: 'localhost',
            port: 3406,
            database: 'shopper',
            dialect: 'mysql',
            username: 'root', 
            password: 'root'
        },
        client: null
    }
};
