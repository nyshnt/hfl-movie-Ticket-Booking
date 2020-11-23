const express = require('express');
const router = express.Router();

router.use('/admin', require('./admin'));
router.use('/cafeteria', require('./cafeteria'));
router.use('/movie', require('./movie'));
router.use('/ticket', require('./ticket'))

module.exports = router;