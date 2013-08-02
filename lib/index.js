module.exports = function(chai, _) {
  var Test = require('./test');
  
  chai.passport = function(strategy) {
    return new Test(strategy);
  };
};
