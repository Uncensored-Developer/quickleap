const userService = require('./services/user');


data = {
  username: '08022237672',
  password: 'goodbrain',
  account_type: 'trader',
  salt: '57465264',
  referral_code: '654756'
};

user = new userService().createUser(data);

console.log(user);
