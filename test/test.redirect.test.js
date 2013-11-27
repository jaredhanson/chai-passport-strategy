/* global describe, it, before, expect */

var Test = require('../lib/test');

describe('test strategy that calls redirect', function() {
  
  function Strategy() {}
  Strategy.prototype.authenticate = function() {
    this.redirect('/login', 401);
  };
  
  describe('with a redirect callback', function() {
    var url
      , status;
    
    before(function(done) {
      var test = new Test(new Strategy());
      test.redirect(function(u, s) {
        url = u;
        status = s;
        done();
      }).authenticate();
    });
    
    it('should call redirect callback', function() {
      expect(url).to.be.equal('/login');
      expect(status).to.equal(401);
    });
  });
  
  describe('without a redirect callback', function() {
    
    it('should throw an error', function() {
      expect(function() {
        var test = new Test(new Strategy());
        test.authenticate();
      }).to.throw(Error, 'Strategy#redirect should not be called');
    });
    
  });
  
});
