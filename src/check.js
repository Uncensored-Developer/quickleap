const moment = require('moment');
const Op = require('sequelize').Op;
const V = require('./models').VerificationCode;

// console.log(moment())
// console.log(moment().subtract(5, 'minutes').toISOString(true))
V.findOne({
  where: {
    code: "111689",
    createdAt: {
      [Op.gte]: moment().subtract(5, 'minutes').toDate()
    }
  }
}).then((data) => {
  console.log(data);
})