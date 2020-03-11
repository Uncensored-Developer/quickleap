const typedi = require('typedi');
const EventEmitter = require('events');
const event = require('./events');


const ee = require('./emitter').getInstance();

ee.on(event.user.signUp, (user) => {
  console.log(user);
});

