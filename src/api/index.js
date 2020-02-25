const express = require('express');
const usersRoute = require('./routes/users');

module.exports = () => {
  const app = express.Router();

  usersRoute(app);

  return app;
};
