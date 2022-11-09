/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
const mysql = require('mysql2/promise');
const CoinAPI = require('../CoinAPI');

class MySQLBackend {

    constructor() {
        this.coinAPI = new CoinAPI();
        this.connection = null;
    }

    async connect() {
        this.connection = await mysql.createConnection({
            host: 'localhost',
            port: 3406,
            user: 'root',
            password: 'root',
            database: 'maxcoin'
        });
        return this.connection;
    }

    async disconnect() {
        return this.connection.end();
    }

    async insert() {
        const data = await this.coinAPI.fetch();
        const sql = 'INSERT INTO coinvalues (valuedate, coinvalue) VALUES ?';
        const values = [];
        Object.entries(data.bpi).forEach((entry) => {
            values.push([entry[0], entry[1]]);
        });
        return this.connection.query(sql, [values]);
    }

    async getMax() {
        return this.connection.query('SELECT * FROM coinvalues ORDER BY coinvalue DESC LIMIT 0,1');
    }

    async max() {
        console.info('Connecting to MySQL...\r');
        console.time('mysql-connect');

        const connection = await this.connect();

        if (connection) {
            console.info('Successfully connected to MySQL\r');
        } else {
            throw new Error('Connection to MySQL Failed\r');
        }
        console.timeEnd('mysql-connect');

        console.info('Inserting into MySQL...');
        console.time('mysql-insert');
        const insertResult = await this.insert();
        console.timeEnd('mysql-insert');

        console.info(`Inserted ${insertResult[0].affectedRows} documents into MySQL`);

        console.info('Querying MySQL...');
        console.time('mysql-find');
        const result = await this.getMax();
        const row = result[0][0];
        console.timeEnd('mysql-find');

        console.info('Disonnecting from MySQL...\r');
        console.time('mysql-disconnect');
        await this.disconnect();
        console.timeEnd('mysql-disconnect');
        return row;
    }
}

module.exports = MySQLBackend;