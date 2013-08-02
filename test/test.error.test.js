var Test = require('../lib/test');

describe('test strategy that calls error', function() {
  
  function Strategy() {}
  Strategy.prototype.authenticate = function() {
    this.error(new Error('something went wrong'));
  }
  
  describe('with an error callback', function() {
    var err;
    
    before(function(done) {
      var test = new Test(new Strategy());
      test.error(function(e) {
        err = e;
        done();
      }).authenticate();
    });
    
    it('should call error callback', function() {
      expect(err).to.be.an.instanceof(Error);
      expect(err.message).to.equal('something went wrong')
    });
  });
  
  describe('without an error callback', function() {
    
    it('should throw an error', function() {
      expect(function() {
        var test = new Test(new Strategy());
        test.authenticate();
      }).to.throw(Error, 'Strategy#error should not be called');
    });
    
  });
  
});
