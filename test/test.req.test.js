/* global describe, it, before, expect */

var Test = require('../lib/test');

describe('preparing a request', function() {
  
  function Strategy() {}
  Strategy.prototype.authenticate = function(req, options) {
    if (req.headers.foo !== 'bar') { return this.fail(); }
    if (options.bar !== 'baz') { return this.fail(); }
    
    this.success({ id: '1234'}, { scope: 'read' });
  };
  
  describe('sync', function() {
    
    var ok;
  
    before(function(done) {
      var test = new Test(new Strategy());
      test.success(function(u, i) {
        ok = true;
        done();
      }).fail(function() {
        ok = false;
        done();
      }).request(function(req) {
        req.headers.foo = 'bar';
      }).authenticate({ bar: 'baz' });
    });
  
    it('should call success', function() {
      expect(ok).to.be.true;
    });
    
  });
  
  describe('async', function() {
    
    var ok;
  
    before(function(done) {
      var test = new Test(new Strategy());
      test.success(function(u, i) {
        ok = true;
        done();
      }).fail(function() {
        ok = false;
        done();
      }).request(function(req, res, done) {
        req.headers.foo = 'bar';
        process.nextTick(done);
      }).authenticate({ bar: 'baz' });
    });
  
    it('should call success', function() {
      expect(ok).to.be.true;
    });
    
  });
  
});
