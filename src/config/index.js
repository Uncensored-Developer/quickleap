const dotenv = require('dotenv');

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (!envFound) {
  // This error should crash whole process
  throw new Error("Couldn't find .env file.");
}

module.exports = {
  api: {
    prefix: {
      v1: '/v1'
    }
  },
  port: parseInt(process.env.PORT, 10),
  // Used by winston logger
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  databaseUrl: process.env.DATABASE_URL,

  testDatabaseUrl: process.env.TEST_DATABASE_URL,

  mongoUrl: process.env.MONGODB_URI,

  jwtSecret: process.env.JWT_SECRET,
};
