/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */

const { MongoClient } = require('mongodb');

const CoinAPI = require('../CoinAPI');

class MongoBackend {

    constructor() {
        this.coinAPI = new CoinAPI();
        this.mongoUrl = 'mongodb://localhost:27017/maxcoin';
        this.client = null;
        this.collection = null;
    }

    async connect() {
        const mongoClient = new MongoClient(this.mongoUrl, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });

        this.client = await mongoClient.connect();
        this.collection = this.client.db('maxcoin').collection('values');
        return this.client;
    }

    async disconnect() {
        if (this.client) {
            return this.client.close;
        } 
        
        return false;
    }

    async insert() { }

    async getMax() { }

    async max() {
        console.info('Connecting to MongoDB...\r');
        console.time('mongodb-connect');

        const client = await this.connect();

        if (client) {
            console.info('Successfully connected to MongoDB\r');
        } else {
            throw new Error('Connection to MongoDB Failed\r');
        }
        console.timeEnd('mongodb-connect');
        
        console.info('Disonnecting from MongoDB...\r');
        console.time('mongodb-disconnect');
        await this.disconnect();
        console.timeEnd('mongodb-disconnect');
    }
}

module.exports = MongoBackend;