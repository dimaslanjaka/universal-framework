// warning: This file is auto generated by `npm run build:tests`
// Do not edit by hand!
process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var split = require('../../../../src/php/strings/split.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/strings/split.js (tested in test/languages/php/strings/test-split.js)', function () {
  it('should pass example 1', function (done) {
    var expected = ['Kevin', 'van', 'Zonneveld']
    var result = split(' ', 'Kevin van Zonneveld')
    expect(result).to.deep.equal(expected)
    done()
  })
})
