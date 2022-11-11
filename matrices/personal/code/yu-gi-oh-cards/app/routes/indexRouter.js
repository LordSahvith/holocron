import express from 'express';

const router = express.Router();

/* GET home page */
router.get('/', (req, res) => {
    res.render('index', {
        title: 'Yu-Gi-Oh Cards',
        cardInfo: {
            title: 'Castle of Dark Illusions',
            setCode: 'MRD-073',
            level: 4,
            type: 'Flip Effect Monster',
            race: 'Fiend',
            attribute: 'Dark',
            description: 'FLIP: All Zombie - Type monsters gain 200 ATK and DEF. During each of your next 4 Standby Phases, each of those Zombie - Type monsters gains 200 more ATK and DEF. These effects last as long as this card is face - up on the field.',
            attack: 920,
            defense: 1930
        }
    });
});

module.exports = router;
