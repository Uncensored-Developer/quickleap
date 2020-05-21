const event = require('./events');


const ee = require('./emitter').getInstance();

ee.on(event.user.signUp, (user) => {
});

