/* global describe, it, expect */

var Request = require('../lib/request');

describe('Request', function() {
  
  var req = new Request();
  
  it('should be constructed with default properties', function() {
    expect(Object.keys(req)).to.have.length(3);
    expect(req.method).to.equal('GET');
    expect(req.url).to.equal('/');
    expect(req.headers).to.be.an.object;
  });
  
});
