import express from 'express';

const router = express.Router();

/* GET home page */
router.get('/', (req, res) => {
    res.render('index', { title: 'Yu-Gi-Oh Cards' });
});

module.exports = router;
