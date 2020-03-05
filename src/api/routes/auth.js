const express = require('express');
const celebrate = require('celebrate');
const eah = require('express-async-handler');
const typedi = require('typedi');
const router = express.Router();

module.exports = app => {
  app.use('/auth', router);

  router.post('/', function(req, res) {
    res.json({user: req.body}).status(200);
  });

};
