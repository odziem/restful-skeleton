'use strict';

const carRoutes = require('./routes/car.router');

exports.configure = (app) => {
  app.use('/api/cars', carRoutes);
};
