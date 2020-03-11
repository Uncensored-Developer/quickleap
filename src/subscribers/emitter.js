const EventEmitter = require('events');

module.exports = (function () {

  let instance;

  return {
    getInstance: function () {
      if (instance === undefined) {
        instance = new EventEmitter()
      }
      return instance;
    }
  }

})();
