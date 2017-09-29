# chai-passport-strategy

[![Version](https://img.shields.io/npm/v/chai-passport-strategy.svg?label=version)](https://www.npmjs.com/package/chai-passport-strategy)
[![Build](https://img.shields.io/travis/jaredhanson/chai-passport-strategy.svg)](https://travis-ci.org/jaredhanson/chai-passport-strategy)
[![Quality](https://img.shields.io/codeclimate/github/jaredhanson/chai-passport-strategy.svg?label=quality)](https://codeclimate.com/github/jaredhanson/chai-passport-strategy)
[![Coverage](https://img.shields.io/coveralls/jaredhanson/chai-passport-strategy.svg)](https://coveralls.io/r/jaredhanson/chai-passport-strategy)
[![Dependencies](https://img.shields.io/david/jaredhanson/chai-passport-strategy.svg)](https://david-dm.org/jaredhanson/chai-passport-strategy)


Helpers for testing [Passport](http://passportjs.org/) strategies with the
[Chai](http://chaijs.com/) assertion library.

## Install

    $ npm install chai-passport-strategy

## Usage

#### Use Plugin

Use this plugin as you would all other Chai plugins:

```javascript
var chai = require('chai');

chai.use(require('chai-passport-strategy'));
```

#### Implement Test Cases

Once used, the `chai.passport.use` helper function will be available to set up
test cases for Passport strategies.

The helper function can be called from a hook to setup the test case.  The
helper returns a wrapper on which callbacks are registered to be executed
when the strategy invokes its final action function.  The callbacks correspond
to Passport's strategy API: `success()`, `fail()`, `redirect()`, `pass()`, and
`error()`.  If the strategy invokes an action that doesn't have a registered
callback, the test helper will automatically throw an exception.

The following demonstrates a [Mocha](http://mochajs.org/) test
case, taken from [passport-http-bearer](https://github.com/jaredhanson/passport-http-bearer)'s
test suite.


```javascript
describe('token strategy', function() {
    
  var strategy = new Strategy(function(token, done) {
    if (token == 'vF9dft4qmT') { 
      return done(null, { id: '1234' }, { scope: 'read' });
    }
    return done(null, false);
  });
  
  describe('handling a request with valid credential in header', function() {
    var user
      , info;
    
    before(function(done) {
      chai.passport.use(strategy)
        .success(function(u, i) {
          user = u;
          info = i;
          done();
        })
        .req(function(req) {
          req.headers.authorization = 'Bearer vF9dft4qmT';
        })
        .authenticate();
    });
    
    it('should supply user', function() {
      expect(user).to.be.an.object;
      expect(user.id).to.equal('1234');
    });
    
    it('should supply info', function() {
      expect(info).to.be.an.object;
      expect(info.scope).to.equal('read');
    });
  });
});
```

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2013-2017 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/vK9dyjRnnWsMzzJTQ57fRJpH/jaredhanson/chai-passport-strategy'>
  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/vK9dyjRnnWsMzzJTQ57fRJpH/jaredhanson/chai-passport-strategy.svg' />
</a>
