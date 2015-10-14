'use strict';

const R = require('ramda');
const winston = require('winston');
const router = require('express').Router();
const Car = require('./car.model');

exports.configure = function(app) {
  router.post('/api/cars', httpCreateNewCar);
  router.get('/api/cars', httpGetCarList);

  app.use(router);
};

/*
 * Sample route to save a new car to our MongoDB collection.
 */
function httpCreateNewCar(req, res) {
  const data = req.body;

  const name = data.name;
  const brand = data.brand;

  if (!name || !brand) {
    return res.status(400).json({ error: 'Required data missing.' });
  }

  const pickCarData = R.pick(['name', 'brand', 'engineOperational', 'distanceDriven']);
  const newCar = new Car(pickCarData(data));

  return newCar.save()
  .then((result) => {
    return res.status(201).json(result);
  })
  .then(null, (err) => {
    winston.error(err);
    return res.status(500).json({ error: 'Failed to save car.' });
  });
};

/*
 * Sample route to get the list of cars in our database.
 */
function httpGetCarList(req, res) {
  return Car.find({})
  .then((result) => {
    return res.status(200).json(result);
  })
  .then(null, (err) => {
    winston.error(err);
    return res.status(500).json({ error: 'Failed to get car list' });
  });
};
