const event = require('./events');


const ee = require('./emitter').getInstance();

// eslint-disable-next-line no-unused-vars
ee.on(event.user.signUp, (user) => {
});

