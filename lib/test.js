// Load modules.
var Request = require('./request')
  , Response = require('./response');


/**
 * Creates an instance of `Test`.
 *
 * @constructor
 * @access protected
 */
function Test(strategy) {
  this._strategy = strategy;
}

/**
 * Register a callback to be invoked when request is prepared.
 *
 * @param {Function} cb
 * @return {Test} for chaining
 * @access public
 */
Test.prototype.request = function(cb) {
  this._request = cb;
  return this;
};

/**
 * Register a callback to be invoked when strategy calls `success()`.
 *
 * @param {Function} cb
 * @return {Test} for chaining
 * @access public
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
 * @access public
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
 * @access public
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
 * @access public
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
 * @access public
 */
Test.prototype.error = function(cb) {
  this._error = cb;
  return this;
};

/**
 * Register a callback to be invoked when strategy `end()`s response.
 *
 * @param {Function} cb
 * @return {Test} for chaining
 * @access public
 */
Test.prototype.finish = function(cb) {
  this._finish = cb;
  return this;
};

/**
 * Start strategy authentication test with optional options.
 *
 * @param {object} options
 * @access public
 */
Test.prototype.authenticate = function(options) {
  var self = this
    , req = new Request()
    , res = new Response()
    , prepare = this._request;
  
  res.once('finish', function() {
    if (!self._finish) { throw new Error('res#end should not be called'); }
    self._finish.call(this);
  });
  
  function ready() {
    // Create a new instance from the prototype strategy.
    var strategy = Object.create(self._strategy);
    
    // Extend the instance with action functions.
    strategy.success = function(user, info) {
      if (!self._success) { throw new Error('Strategy#success should not be called'); }
      self._success.apply(req, arguments);
    };
    
    strategy.fail = function(challenge, status) {
      if (!self._fail) { throw new Error('Strategy#fail should not be called'); }
      self._fail.apply(req, arguments);
    };
    
    strategy.redirect = function(url, status) {
      if (!self._redirect) { throw new Error('Strategy#redirect should not be called'); }
      self._redirect.apply(req, arguments);
    };
    
    strategy.pass = function() {
      if (!self._pass) { throw new Error('Strategy#pass should not be called'); }
      self._pass.apply(req, arguments);
    };
    
    strategy.error = function(err) {
      if (!self._error) { throw new Error('Strategy#error should not be called'); }
      self._error.apply(req, arguments);
    };
    
    strategy.authenticate(req, options);
  }
  
  if (prepare && prepare.length == 3) {
    prepare(req, res, ready);
  } else if (prepare) {
    prepare(req, res);
    ready();
  } else {
    ready();
  }
};


// Expose constructor.
module.exports = Test;
