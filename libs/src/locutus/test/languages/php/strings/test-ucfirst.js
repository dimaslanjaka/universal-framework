// warning: This file is auto generated by `npm run build:tests`
// Do not edit by hand!
process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var ucfirst = require('../../../../src/php/strings/ucfirst.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/strings/ucfirst.js (tested in test/languages/php/strings/test-ucfirst.js)', function () {
  it('should pass example 1', function (done) {
    var expected = 'Kevin van zonneveld'
    var result = ucfirst('kevin van zonneveld')
    expect(result).to.deep.equal(expected)
    done()
  })
})
