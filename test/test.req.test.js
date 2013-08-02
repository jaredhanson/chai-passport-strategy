var Test = require('../lib/test');

describe('test strategy that prepares request', function() {
  
  function Strategy() {}
  Strategy.prototype.authenticate = function(req, options) {
    if (req.headers.foo !== 'bar') { return this.fail(); }
    if (options.bar !== 'baz') { return this.fail(); }
    
    this.success({ id: '1234'}, { scope: 'read' });
  }
  
  describe('sync', function() {
    
    describe('and authenticates', function() {
      var ok;
    
      before(function(done) {
        var test = new Test(new Strategy());
        test.success(function(u, i) {
          ok = true;
          done();
        }).fail(function() {
          ok = false;
          done();
        }).req(function(req) {
          req.headers.foo = 'bar';
        }).authenticate({ bar: 'baz' });
      });
    
      it('should call success', function() {
        expect(ok).to.be.true;
      });
    });
    
  });
  
  describe('async', function() {
    
    describe('and authenticates', function() {
      var ok;
    
      before(function(done) {
        var test = new Test(new Strategy());
        test.success(function(u, i) {
          ok = true;
          done();
        }).fail(function() {
          ok = false;
          done();
        }).req(function(req, done) {
          req.headers.foo = 'bar';
          process.nextTick(done);
        }).authenticate({ bar: 'baz' });
      });
    
      it('should call success', function() {
        expect(ok).to.be.true;
      });
    });
    
  });
  
});
