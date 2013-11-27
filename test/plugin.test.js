/* global describe, it, expect */

var plugin = require('..')
  , Test = require('../lib/test');

describe('plugin', function() {
  
  var chai = {};
  plugin(chai);
  
  it('should add passport helper to chai', function() {
    expect(chai.passport).to.be.a('object');
    expect(chai.passport.use).to.be.a('function');
  });
  
  describe('when invoked', function() {
    var test = chai.passport.use({});
    
    it('should return test wrapper', function() {
      expect(test).to.be.an.instanceOf(Test);
    });
  });
  
});
