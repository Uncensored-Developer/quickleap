const typedi = require('typedi');
const moni = require('./utils/payments/monnify');

const m = typedi.Container.get(moni);

async function ch() {
    let res = await m.getTransaction({ paymentRef: '123031klsadkad'})
    console.log(res);
}

ch();
