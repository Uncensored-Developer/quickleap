const Agenda = require('agenda');


module.exports = ({mongoConnection}) => {

  return new Agenda({
    mongo: mongoConnection
  });

};
