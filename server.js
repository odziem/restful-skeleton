/*
 * Server entry point.
 */
'use strict';

const express = require('express');
const hsts = require('hsts');
const morgan = require('morgan');
const winston = require('winston');

const app = express();
const api = require('./app/api');

app.use(hsts({ force: true }));
app.use(morgan('combined'));

require('./config.js');

api.configure(app);

app.use(function (req, res) {
  res.status(404).send();
});

if (require.main === module) {
  app.listen(process.env.PORT, function() {
    winston.info(`Listening on http://localhost:${process.env.PORT}...`);
  });
}

module.exports = app;