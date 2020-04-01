const express = require('express');
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const farmerRoute = require('./routes/farmer');
const traderRoute = require('./routes/trader');

module.exports = () => {
  const app = express.Router();

  usersRoute(app);
  authRoute(app);
  farmerRoute(app);
  traderRoute(app);

  return app;
};
