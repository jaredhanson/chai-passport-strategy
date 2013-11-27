/* global describe, it, before, expect */

var Test = require('../lib/test');

describe('test strategy that calls pass', function() {
  
  function Strategy() {}
  Strategy.prototype.authenticate = function() {
    this.pass();
  };
  
  describe('with a pass callback', function() {
    var ok;
    
    before(function(done) {
      var test = new Test(new Strategy());
      test.pass(function() {
        ok = true;
        done();
      }).authenticate();
    });
    
    it('should call pass callback', function() {
      expect(ok).to.be.true;
    });
  });
  
  describe('without a pass callback', function() {
    
    it('should throw an error', function() {
      expect(function() {
        var test = new Test(new Strategy());
        test.authenticate();
      }).to.throw(Error, 'Strategy#pass should not be called');
    });
    
  });
  
});
