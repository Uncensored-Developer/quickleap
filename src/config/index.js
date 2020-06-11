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

  markUp: {
    product: 50
  },

  sentry: {
    live: process.env.USE_SENTRY,
    dsn: process.env.SENTRY_DSN
  },

  monnify: {
    apiKey: process.env.MONNIFY_API_KEY,
    apiSecret: process.env.MONNIFY_API_SECRET,
    contractCode: process.env.MONNIFY_CONTRACT_CODE
  },

  payments: {
    redirectUrl: 'https://instagrame.com',
    gateway: process.env.PAYMENT_GATEWAY
  },

  live: process.env.LIVE,

  databaseUrl: process.env.DATABASE_URL,

  testDatabaseUrl: process.env.TEST_DATABASE_URL,

  mongoUrl: process.env.MONGODB_URI,

  jwtSecret: process.env.JWT_SECRET,
};
