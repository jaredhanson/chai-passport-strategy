# chai-passport-strategy

[![Build](https://travis-ci.org/jaredhanson/chai-passport-strategy.png)](http://travis-ci.org/jaredhanson/chai-passport-strategy)
[![Coverage](https://coveralls.io/repos/jaredhanson/chai-passport-strategy/badge.png)](https://coveralls.io/r/jaredhanson/chai-passport-strategy)
[![Dependencies](https://david-dm.org/jaredhanson/chai-passport-strategy.png)](http://david-dm.org/jaredhanson/chai-passport-strategy)


Helpers for testing [Passport](http://passportjs.org/) strategies with the
[Chai](http://chaijs.com/) assertion library.

## Install

    $ npm install chai-passport-strategy

## Usage

#### Use Plugin

Use this plugin as you would all other Chai plugins:

```javascript
var chai = require('chai')
  , passport = require('chai-passport-strategy');

chai.use(passport);
```

#### Write Test Cases

Once used, the `chai.passport` helper function will be available to set up
test cases for Passport strategies.

The helper function can be called from a hook to setup the test case.  The
helper returns a wrapper on which callbacks are registered to be executed
when the strategy invokes its final action function.  The callbacks correspond
to Passport's strategy API: `success()`, `fail()`, `redirect()`, `pass()`, and
`error()`.  If the strategy invokes an action that doesn't have a registered
callback, the test helper will automatically throw an exception.

The following demonstrates a [Mocha](http://visionmedia.github.io/mocha/) test
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
      chai.passport(strategy)
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

## Tests

    $ npm install
    $ npm test

## Credits

  - [Jared Hanson](http://github.com/jaredhanson)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2013 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>
