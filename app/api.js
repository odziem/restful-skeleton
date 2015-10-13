'use strict';

const router = require('express').Router();

exports.configure = function(app) {
  router.get('/api/ping', ping);

  app.use(router);
};

function ping(req, res) {
  res.send('pong');
};