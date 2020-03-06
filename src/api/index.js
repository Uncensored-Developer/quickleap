const express = require('express');
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');

module.exports = () => {
  const app = express.Router();

  usersRoute(app);
  authRoute(app);

  return app;
};
