/**
 * Module dependencies.
 */
var Request = require('./request');


/**
 * Creates an instance of `Test`.
 *
 * @constructor
 * @api protected
 */
function Test(strategy) {
  this._strategy = strategy;
}

/**
 * Register a callback to be invoked when strategy calls `success()`.
 *
 * @param {Function} cb
 * @return {Test} for chaining
 * @api public
 */
Test.prototype.success = function(cb) {
  this._success = cb;
  return this;
};

/**
 * Register a callback to be invoked when strategy calls `fail()`.
 *
 * @param {Function} cb
 * @return {Test} for chaining
 * @api public
 */
Test.prototype.fail = function(cb) {
  this._fail = cb;
  return this;
};

/**
 * Register a callback to be invoked when strategy calls `redirect()`.
 *
 * @param {Function} cb
 * @return {Test} for chaining
 * @api public
 */
Test.prototype.redirect = function(cb) {
  this._redirect = cb;
  return this;
};

/**
 * Register a callback to be invoked when strategy calls `pass()`.
 *
 * @param {Function} cb
 * @return {Test} for chaining
 * @api public
 */
Test.prototype.pass = function(cb) {
  this._pass = cb;
  return this;
};

/**
 * Register a callback to be invoked when strategy calls `error()`.
 *
 * @param {Function} cb
 * @return {Test} for chaining
 * @api public
 */
Test.prototype.error = function(cb) {
  this._error = cb;
  return this;
};

/**
 * Register a callback to be invoked when request is prepared.
 *
 * @param {Function} cb
 * @return {Test} for chaining
 * @api public
 */
Test.prototype.req = function(cb) {
  this._req = cb;
  return this;
};

/**
 * Start strategy authentication test with optional options.
 *
 * @param {Object} options
 * @api public
 */
Test.prototype.authenticate = function(options) {
  var self = this
    , req = new Request()
    , before = this._req;
  
  function ready() {
    // Create a new instance from the prototype strategy.
    var strategy = Object.create(self._strategy);
    
    // Extend the instance with action functions.
    strategy.success = function(user, info) {
      if (!self._success) { throw new Error('Strategy#success should not be called'); }
      self._success.apply(this, arguments);
    };
    
    strategy.fail = function(challenge, status) {
      if (!self._fail) { throw new Error('Strategy#fail should not be called'); }
      self._fail.apply(this, arguments);
    };
    
    strategy.redirect = function(url, status) {
      if (!self._redirect) { throw new Error('Strategy#redirect should not be called'); }
      self._redirect.apply(this, arguments);
    };
    
    strategy.pass = function() {
      if (!self._pass) { throw new Error('Strategy#pass should not be called'); }
      self._pass.apply(this, arguments);
    };
    
    strategy.error = function(err) {
      if (!self._error) { throw new Error('Strategy#error should not be called'); }
      self._error.apply(this, arguments);
    };
    
    strategy.authenticate(req, options);
  }
  
  if (before && before.length == 2) {
    before(req, ready);
  } else if (before) {
    before(req);
    ready();
  } else {
    ready();
  }
};


/**
 * Expose `Test`.
 */
module.exports = Test;
