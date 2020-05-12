const typedi = require('typedi');
const readline = require('readline');
const authService = require('../services/auth');
const logger = require('../loaders/logger');


typedi.Container.set('logger', logger);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const authServiceInstance = typedi.Container.get(authService);

const data = {account_type: 'admin'}

rl.question('Enter username: ', (username) => {
    data.username = username;

    // mute stdout
    rl.stdoutMuted = true;
   
    rl.question('Enter password: ', (password) => {
        if(password.length >= 8) {
            const password1 = password
            rl.question('Re-Enter password: ', (password) => {

                if (password1 !== password) {
                    console.log('Password do not match.');
                    rl.close()
                } else {
                    data.password = password;
                    authServiceInstance.signUp(data).then((data)=> {
                        console.log('Admin created successfully!');
                        rl.close()
                    }).catch((e) => {
                        console.log('Something went wrong, try again later.');
                        rl.close()
                    })
                }
            })
        } else {
            console.log('Password must be atleast 8 characters.');
            rl.close()
        }
    })

    rl._writeToOutput = function _writeToOutput(stringToWrite) {
        if (rl.stdoutMuted) {
            rl.output.write('*');
        } else {
            rl.output.write(stringToWrite);
        }
    }
})

