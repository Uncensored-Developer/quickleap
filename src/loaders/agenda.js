const Agenda = require('agenda');
const config = require('../config');


module.exports = ({mongoConnection}) => {

  return new Agenda({
    mongo: mongoConnection
  });

};
