const typedi = require('typedi');
const moni = require('./utils/payments/monnify');

const m = typedi.Container.get(moni);

console.log(m);
