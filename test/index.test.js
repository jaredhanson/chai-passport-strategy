var passportStrategy = require('..')
  , Test = require('../lib/test');

describe('helper', function() {
  
  var chai = {};
  passportStrategy(chai);
  
  it('should add passport helper to chai', function() {
    expect(chai.passport).to.be.a('function');
  });
  
  describe('when invoked', function() {
    var test = chai.passport({});
    
    it('should return test wrapper', function() {
      expect(test).to.be.an.instanceOf(Test);
    });
  });
  
});
