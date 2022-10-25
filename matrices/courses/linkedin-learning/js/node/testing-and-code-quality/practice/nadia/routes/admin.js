const express = require('express');
const router = express.Router();
const debug = require('debug')('nadia:route:admin');
const _ = require('lodash');
const reservations = require('../lib/reservations');

/* GET admin listing. */
router.get('/admin', function (req, res, next) {
    reservations.fetch()
        .then(reservations => {
            res.render('admin', {
                title: 'Booking Requests - Nadia\'s Garden',
                reservations,
                header: _.keys(reservations[0])
            });
        })
});

module.exports = router;
