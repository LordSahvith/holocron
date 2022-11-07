import express from 'express';
import data from '../src/testData';

const router = express.Router();
const contests = data.contests.reduce((obj, contest) => {
    obj[contest.id] = contest;
    return obj;
}, {});

router.get('/contests', (req, res) => {
    res.send({
        contests: contests
    });
});

router.get('/contests/:contestId', (req, res) => {
    let contest = contests[req.params.contestId];
    contest.description = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt culpa odit vel animi cum velit quo, ex illo corrupti! Enim beatae iste atque quae saepe reiciendis obcaecati veniam eius dicta.';

    res.send(contest);
});

export default router;
