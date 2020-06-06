const typedi = require('typedi');
const verification = require('./services/userVerification');


const verificationInstance = typedi.Container.get(verification);

verificationInstance.createVerificationCode({});