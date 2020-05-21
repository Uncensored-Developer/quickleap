const typedi = require('typedi');
const readlineSync = require('readline-sync');
const authService = require('../services/auth');
const logger = require('../loaders/logger');


typedi.Container.set('logger', logger);

const authServiceInstance = typedi.Container.get(authService);

const data = { account_type: 'admin' };

const username = readlineSync.question('Enter username: ');

let repeat = true;

let password1;

while (repeat) {
    password1 = readlineSync.question('Enter password: ', {hideEchoBack: true, mask: '*'});
    if (password1.length >= 8) {
        const password2 = readlineSync.question('Re-Enter password: ', { hideEchoBack: true, mask: '*' });
        if (password1 === password2) {
            repeat = false;
        } else {
            console.log('\x1b[41m', 'Passwords do not match.')
            console.log('\x1b[0m');
        }
    } else {
        console.log('\x1b[41m', 'Password should be atleast 8 characters.');
        console.log('\x1b[0m');
    }
}

data.password = password1;
data.username = username;

// eslint-disable-next-line no-unused-vars
authServiceInstance.signUp(data).then((data) => {
    console.log('\x1b[42m','Admin created successfully!');
    console.log('\x1b[0m');
// eslint-disable-next-line no-unused-vars
}).catch((e) => {
    console.log('\x1b[41m', 'Something went wrong, try again later.');
    console.log('\x1b[0m');
})
