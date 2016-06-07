'use strict';

const controller = require('./car.controller');

const router = require('express').Router();

router.post('/', controller.httpCreateNewCar);
router.get('/', controller.httpGetCarList);

module.exports = router;
