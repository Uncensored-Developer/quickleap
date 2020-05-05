const express = require('express');
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const farmerRoute = require('./routes/farmer');
const traderRoute = require('./routes/trader');
const truckerRoute = require('./routes/trucker');
const warehouseRoute = require('./routes/warehouse');
const productRoute = require('./routes/product');
const productinfoRoute = require('./routes/productInfo');
const cartRoute = require('./routes/cart');


module.exports = () => {
  const app = express.Router();

  usersRoute(app);
  authRoute(app);
  farmerRoute(app);
  traderRoute(app);
  truckerRoute(app);
  warehouseRoute(app);
  productRoute(app);
  productinfoRoute(app);
  cartRoute(app);

  return app;
};
