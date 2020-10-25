// warning: This file is auto generated by `npm run build:tests`
// Do not edit by hand!
process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var strval = require('../../../../src/php/var/strval.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/var/strval.js (tested in test/languages/php/var/test-strval.js)', function () {
  it('should pass example 1', function (done) {
    var expected = 'Object'
    var result = strval({red: 1, green: 2, blue: 3, white: 4})
    expect(result).to.deep.equal(expected)
    done()
  })
})
