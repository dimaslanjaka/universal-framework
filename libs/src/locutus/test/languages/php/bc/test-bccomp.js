// warning: This file is auto generated by `npm run build:tests`
// Do not edit by hand!
process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var bccomp = require('../../../../src/php/bc/bccomp.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/bc/bccomp.js (tested in test/languages/php/bc/test-bccomp.js)', function () {
  it('should pass example 1', function (done) {
    var expected = -1
    var result = bccomp('-1', '5', 4)
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    var expected = -1
    var result = bccomp('1928372132132819737213', '8728932001983192837219398127471')
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 3', function (done) {
    var expected = 0
    var result = bccomp('1.00000000000000000001', '1', 2)
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 4', function (done) {
    var expected = 1
    var result = bccomp('97321', '2321')
    expect(result).to.deep.equal(expected)
    done()
  })
})
