import express from 'express';
import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from '../config';

let mdb;
MongoClient.connect(config.mongodbUri, (err, client) => {
    assert.equal(null, err);

    mdb = client.db('Fullstack-node-react');
});

const router = express.Router();

router.get('/contests', (req, res) => {
    let contests = {};
    mdb.collection('contests').find({})
        .each((err, contest) => {
            assert.equal(null, err);

            if (!contest) {
                res.send(contests);
                return;
            }

            contests[contest.id] = contest;
        });
});

router.get('/contests/:contestId', (req, res) => {
});

export default router;
