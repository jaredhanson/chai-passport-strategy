/* global describe, it, before, expect */

var Test = require('../lib/test');

describe('testing strategy that calls fail', function() {
  
  function Strategy() {}
  Strategy.prototype.authenticate = function() {
    this.fail('realm="foo"', 401);
  };
  
  describe('with a fail callback', function() {
    var challenge
      , status;
    
    before(function(done) {
      var test = new Test(new Strategy());
      test.fail(function(c, s) {
        challenge = c;
        status = s;
        done();
      }).authenticate();
    });
    
    it('should call fail callback', function() {
      expect(challenge).to.be.equal('realm="foo"');
      expect(status).to.equal(401);
    });
  });
  
  describe('without a fail callback', function() {
    
    it('should throw an error', function() {
      expect(function() {
        var test = new Test(new Strategy());
        test.authenticate();
      }).to.throw(Error, 'Strategy#fail should not be called');
    });
    
  });
  
});
