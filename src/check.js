const typedi = require('typedi');
const verification = require('./services/userVerification');


const verificationInstance = typedi.Container.get(verification);

verificationInstance.checkVerificationCode({id: 1}, '07064').then((data) => {console.log(data)});