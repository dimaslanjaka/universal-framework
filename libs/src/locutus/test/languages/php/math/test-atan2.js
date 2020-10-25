// warning: This file is auto generated by `npm run build:tests`
// Do not edit by hand!
process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var atan2 = require('../../../../src/php/math/atan2.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/math/atan2.js (tested in test/languages/php/math/test-atan2.js)', function () {
  it('should pass example 1', function (done) {
    var expected = 0.7853981633974483
    var result = atan2(1, 1)
    expect(result).to.deep.equal(expected)
    done()
  })
})
