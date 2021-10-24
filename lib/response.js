/**
 * Module dependencies.
 */
var EventEmitter = require('events').EventEmitter
  , util = require('util');


/**
 * Creates an instance of `Response`.
 *
 * This class is used as a mock when testing Passport strategies, substituted in
 * place of of a Node's `http.ServerResponse`.
 *
 * @constructor
 * @access protected
 */
function Response() {
  EventEmitter.call(this);
  
  this.statusCode = 200;
  this._headers = {};
}

util.inherits(Response, EventEmitter);

Response.prototype.end = function(data, encoding) {
  this.emit('finish');
};


/**
 * Expose `Response`.
 */
module.exports = Response;
