/**
 * Creates an instance of `Request`.
 *
 * This class is used as a mock when testing Passport strategies, substituted in
 * place of Node's `http.IncomingMessage`.
 *
 * @constructor
 * @access protected
 */
function Request() {
  this.method = 'GET';
  this.url = '/';
  this.headers = {};
}


// Expose constructor.
module.exports = Request;
