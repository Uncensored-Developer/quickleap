const express = require('express');
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const farmerRoute = require('./routes/farmer');

module.exports = () => {
  const app = express.Router();

  usersRoute(app);
  authRoute(app);
  farmerRoute(app);

  return app;
};
