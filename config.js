/* 
 * Default config items live here. Secrets live in .private/env-*.js.
 */

'use strict';

const R = require('ramda');

const defaults = {
  // Default environment to development mode.
  NODE_ENV: 'dev',

  // API port.
  PORT: 4000,

  // Database connection string.
  DATABASE_URL: 'mongodb://localhost/rangleu'
};

// Set missing environment variables for this process to defaults.
R.keys(defaults).forEach(function(key) {
  if (!process.env.hasOwnProperty(key)) {
    process.env[key] = defaults[key];
  }
});
