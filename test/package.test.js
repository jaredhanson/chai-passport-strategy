var passport = require('..');

describe('chai-passport-strategy', function() {
  
  it('should export function', function() {
    expect(passport).to.be.a('function');
  });
  
});
