/* global describe, it, before, expect */

var expect = require('chai').expect;
var chai = require('chai');
var Test = require('../lib/test');
var Request = require('../lib/request');
var Response = require('../lib/response');


describe('Test', function() {
  
  describe('#authenticate', function() {
    function Strategy() {
    }
    
    Strategy.prototype.authenticate = function(req, options) {
      expect(options).to.deep.equal({ scope: [ 'profile', 'email' ] });
      this.redirect('/authorize', 302);
    };
    
    
    it('should pass options to Strategy#authenticate', function(done) {
      chai.passport.use(new Strategy())
      .redirect(function() {
        done();
      })
      .authenticate({ scope: [ 'profile', 'email' ] });
    }); // should pass options to Strategy#authenticate
    
  }); // #authenticate
  
  describe('#request', function() {
    function Strategy() {
    }
    
    Strategy.prototype.authenticate = function(req) {
      expect(req.headers['authorization']).to.equal('Bearer mF_9.B5f-4.1JqM')
      this.success({ id: '248289761001' });
    };
    
    
    it('should invoke sync callback', function(done) {
      chai.passport.use(new Strategy())
      .request(function(req, res) {
        expect(req).to.be.an.instanceof(Request);
        expect(req.method).to.equal('GET');
        expect(req.url).to.equal('/');
        expect(req.headers).to.deep.equal({});
        
        expect(res).to.be.an.instanceof(Response);
        expect(res.statusCode).to.equal(200);
        
        req.headers['authorization'] = 'Bearer mF_9.B5f-4.1JqM';
      })
      .success(function() {
        done();
      })
      .authenticate();
    }); // should invoke sync callback
    
    it('should invoke async callback', function(done) {
      chai.passport.use(new Strategy())
      .request(function(req, res, cb) {
        expect(req).to.be.an.instanceof(Request);
        expect(req.method).to.equal('GET');
        expect(req.url).to.equal('/');
        expect(req.headers).to.deep.equal({});
        
        expect(res).to.be.an.instanceof(Response);
        expect(res.statusCode).to.equal(200);
        
        req.headers['authorization'] = 'Bearer mF_9.B5f-4.1JqM';
        cb();
      })
      .success(function() {
        done();
      })
      .authenticate();
    }); // should invoke async callback
    
  }); // #request
  
  describe('#success', function() {
    function Strategy() {
    }
    
    Strategy.prototype.authenticate = function(req) {
      this.success({ id: '248289761001' }, { scope: [ 'profile', 'email' ] });
    };
    
    
    it('should invoke callback', function(done) {
      chai.passport.use(new Strategy())
      .success(function(user, info) {
        expect(this).to.be.an.instanceof(Test);
        expect(user).to.deep.equal({ id: '248289761001' });
        expect(info).to.deep.equal({ scope: [ 'profile', 'email' ] });
        done();
      })
      .authenticate();
    }); // should invoke callback
    
    it('should throw when callback is not registered', function() {
      expect(function() {
        chai.passport.use(new Strategy())
        .authenticate();
      }).to.throw(Error, 'Strategy#success should not be called');
    }); // should throw when callback is not registered
    
  }); // #success
  
  describe('#fail', function() {
    function Strategy() {
    }
    
    Strategy.prototype.authenticate = function(req) {
      this.fail('realm="example"', 401);
    };
    
    
    it('should invoke callback', function(done) {
      chai.passport.use(new Strategy())
      .fail(function(challenge, status) {
        expect(this).to.be.an.instanceof(Test);
        expect(challenge).to.equal('realm="example"');
        expect(status).to.equal(401);
        done();
      })
      .authenticate();
    }); // should invoke callback
    
    it('should throw when callback is not registered', function() {
      expect(function() {
        chai.passport.use(new Strategy())
        .authenticate();
      }).to.throw(Error, 'Strategy#fail should not be called');
    }); // should throw when callback is not registered
    
  }); // #fail
  
  describe('#redirect', function() {
    function Strategy() {
    }
    
    Strategy.prototype.authenticate = function(req) {
      this.redirect('/authorize', 302);
    };
    
    
    it('should invoke callback', function(done) {
      chai.passport.use(new Strategy())
      .redirect(function(url, status) {
        expect(this).to.be.an.instanceof(Test);
        expect(url).to.equal('/authorize');
        expect(status).to.equal(302);
        done();
      })
      .authenticate();
    }); // should invoke callback
    
    it('should throw when callback is not registered', function() {
      expect(function() {
        chai.passport.use(new Strategy())
        .authenticate();
      }).to.throw(Error, 'Strategy#redirect should not be called');
    }); // should throw when callback is not registered
    
  }); // #redirect
  
  describe('#pass', function() {
    function Strategy() {
    }
    
    Strategy.prototype.authenticate = function(req) {
      this.pass();
    };
    
    
    it('should invoke callback', function(done) {
      chai.passport.use(new Strategy())
      .pass(function() {
        expect(this).to.be.an.instanceof(Test);
        done();
      })
      .authenticate();
    }); // should invoke callback
    
    it('should throw when callback is not registered', function() {
      expect(function() {
        chai.passport.use(new Strategy())
        .authenticate();
      }).to.throw(Error, 'Strategy#pass should not be called');
    }); // should throw when callback is not registered
    
  }); // #pass
  
  describe('#error', function() {
    function Strategy() {
    }
    
    Strategy.prototype.authenticate = function(req) {
      this.error(new Error('something went wrong'));
    };
    
    
    it('should invoke callback', function(done) {
      chai.passport.use(new Strategy())
      .error(function(err) {
        expect(this).to.be.an.instanceof(Test);
        expect(err).to.be.an.instanceof(Error);
        expect(err.message).to.equal('something went wrong');
        done();
      })
      .authenticate();
    }); // should invoke callback
    
    it('should throw when callback is not registered', function() {
      expect(function() {
        chai.passport.use(new Strategy())
        .authenticate();
      }).to.throw(Error, 'Strategy#error should not be called');
    }); // should throw when callback is not registered
    
  }); // #error
  
  describe('#finish', function() {
    function Strategy() {
    }
    
    Strategy.prototype.authenticate = function(req) {
      req.res.end();
    };
    
    
    it('should invoke callback', function(done) {
      chai.passport.use(new Strategy())
      .request(function(req, res) {
        req.res = res;
        res.req = req;
      })
      .finish(function() {
        expect(this).to.be.an.instanceof(Response);
        done();
      })
      .authenticate();
    }); // should invoke callback
    
    it('should throw when callback is not registered', function() {
      expect(function() {
        chai.passport.use(new Strategy())
        .request(function(req, res) {
          req.res = res;
          res.req = req;
        })
        .authenticate();
      }).to.throw(Error, 'res#end should not be called');
    }); // should throw when callback is not registered
    
  }); // #finish
  
});
