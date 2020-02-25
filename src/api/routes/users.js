const express = require('express');
const router = express.Router();

module.exports = app => {
  app.use('/users', router);

  router.get('/', function(req, res) {
    res.json({user: req.body}).status(200);
  });

};

// router.get('/', function(req, res) {
//   console.log('kkkkkk')
//   res.json({user: req.body}).status(200);
// });
//
// module.exports = router
