const express = require('express');
const router = express.Router();

router.use(require('./homepage'));
router.use(require('./admin'));
router.use(require('./reservations'));

module.exports = router;
