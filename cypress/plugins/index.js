/// <reference types="cypress" />

require('dotenv').config();

module.exports = (on, config) => {
  config.env.baseURL = process.env.BASE_URL;
  config.env.userEmail = process.env.USER_EMAIL;
  config.env.userPassword = process.env.USER_PASSWORD;

  on('task', {
    dbQuery: (query) => require('cypress-postgres')(query.query, query.connection)
  });

  return config;
};
