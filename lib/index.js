module.exports = function(chai, _) {
  var Test = require('./test');
  
  chai.passport = chai.passport || {};
  chai.passport.use = function(strategy) {
    return new Test(strategy);
  };
};
