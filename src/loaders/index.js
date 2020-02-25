const expressLoader = require('./express');
const loggerLoader = require('./logger');


module.exports = async ({expressApp}) => {
  // LOAD AND CONNECT DB
  loggerLoader.info('DB loaded and connected');

  await expressLoader({app: expressApp});

  loggerLoader.info('Express Loaded')
};
