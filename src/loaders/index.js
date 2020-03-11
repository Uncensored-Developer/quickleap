const expressLoader = require('./express');
const loggerLoader = require('./logger');
const mongooseLoader = require('./mongoose');
const DILoader = require('./dependencyInjector');


// require('./events');


module.exports = async ({expressApp}) => {
  // LOAD AND CONNECT DB
  const mongoConn = await mongooseLoader();
  loggerLoader.info('MONGODB loaded and connected');



  await DILoader(mongoConn);

  loggerLoader.info('Dependency Injector loaded');

  await expressLoader({app: expressApp});

  require('./events');

  loggerLoader.info('Express Loaded')
};
