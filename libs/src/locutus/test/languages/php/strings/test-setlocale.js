// warning: This file is auto generated by `npm run build:tests`
// Do not edit by hand!
process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var setlocale = require('../../../../src/php/strings/setlocale.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/strings/setlocale.js (tested in test/languages/php/strings/test-setlocale.js)', function () {
  it('should pass example 1', function (done) {
    var expected = 'en_US'
    var result = setlocale('LC_ALL', 'en_US')
    expect(result).to.deep.equal(expected)
    done()
  })
})
