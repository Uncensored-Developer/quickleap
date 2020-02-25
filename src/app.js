const config = require('./config');
const express = require('express');
const loggerLoader = require('./loaders/logger');

async function startServer() {

  const app = express();

  await require('./loaders')({expressApp: app});

  app.listen(config.port, err => {
    if (err) {
      loggerLoader.error(err);
      process.exit(1);
      return;
    }
    loggerLoader.info(`
      ################################################
          Server listening on port: ${config.port} 
      ################################################
    `);
  })

}

startServer();






// const express = require('express');
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
//
// const indexRouter = require('./api/routes');
// const usersRouter = require('./api/routes/users');
//
// let app = express();
//
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
//
// module.exports = app;
