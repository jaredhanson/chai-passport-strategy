/* global describe, it, expect */

var expect = require('chai').expect;
var chai = require('chai');
var helper = require('..');


before(function() {
  chai.use(helper);
});

describe('chai-passport-strategy', function() {
  
  it('should add passport helper to chai', function() {
    expect(chai.passport).to.be.an('object');
    expect(chai.passport.use).to.be.a('function');
  });
  
});
