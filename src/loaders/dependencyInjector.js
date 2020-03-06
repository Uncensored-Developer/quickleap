const typedi = require('typedi');
const logger = require('./logger');
const agendaLoader = require('./agenda');
const userService = require('../services/user');
const authService = require('../services/auth');
const util = require('../utils/utils');


module.exports = (mongoConnection) => {

  try {
    // models.forEach(m => {
    //   typedi.Container.set(m.name, m.model);
    // typedi.Container.set(
    // });
    const agendaInstance = agendaLoader({ mongoConnection });
    typedi.Container.set('logger', logger);
    typedi.Container.set('agendaInstance', agendaInstance);
    typedi.Container.set('userService', userService);
    typedi.Container.set('authService', authService);
    typedi.Container.set('util', util);
    //   'smsClient',
    //   mailgun_js_1.default({ apiKey: config_1.default.emails.apiKey, domain: config_1.default.emails.domain }),
    // );
    logger.info('✌️ Agenda injected into container');
    return { agenda: agendaInstance };
  } catch(e) {
    logger.error('Error on dependency injector loader: %o', e);
    throw e;
  }

};
