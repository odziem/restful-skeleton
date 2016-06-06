/*
 * Server entry point.
 */
'use strict';

const express = require('express');
const hsts = require('hsts');
const morgan = require('morgan');
const winston = require('winston');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const api = require('./app/api');

app.use(hsts({ force: true }));
app.use(morgan('combined'));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

require('./config.js');

mongoose.connect(process.env.DATABASE_URL);

api.configure(app);

app.use((req, res) => {
  res.status(404).send();
});

if (require.main === module) {
  app.listen(process.env.PORT, () => {
    winston.info(`Listening on http://localhost:${process.env.PORT}...`);
  });
}

module.exports = app;
