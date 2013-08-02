module.exports = function(chai, _) {
  var Test = require('./test');
  
  chai.strategy = function(strategy) {
    return new Test(strategy);
  }
}
