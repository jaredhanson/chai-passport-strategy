var Test = require('../lib/test');

describe('test strategy that calls success', function() {
  
  function Strategy() {}
  Strategy.prototype.authenticate = function() {
    this.success({ id: '1234'}, { scope: 'read' });
  }
  
  describe('with a success callback', function() {
    var user
      , info;
    
    before(function(done) {
      var test = new Test(new Strategy());
      test.success(function(u, i) {
        user = u;
        info = i;
        done();
      }).authenticate();
    });
    
    it('should call success callback', function() {
      expect(user.id).to.be.equal('1234')
      expect(info.scope).to.be.equal('read');
    });
  });
  
  describe('without a success callback', function() {
    
    it('should throw an error', function() {
      expect(function() {
        var test = new Test(new Strategy());
        test.authenticate();
      }).to.throw(Error, 'Strategy#success should not be called');
    });
    
  });
  
});
