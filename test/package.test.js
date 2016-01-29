/* global describe, it, expect */

var helper = require('..')
  , Test = require('../lib/test');

describe('chai-passport-strategy', function() {
  
  it('should export function', function() {
    expect(helper).to.be.a('function');
  });
  
  describe('used as a chai helper', function() {
    var chai = {};
    helper(chai);
  
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
  
});
