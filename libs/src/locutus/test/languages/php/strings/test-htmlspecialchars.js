// warning: This file is auto generated by `npm run build:tests`
// Do not edit by hand!
process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var htmlspecialchars = require('../../../../src/php/strings/htmlspecialchars.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/strings/htmlspecialchars.js (tested in test/languages/php/strings/test-htmlspecialchars.js)', function () {
  it('should pass example 1', function (done) {
    var expected = '&lt;a href=&#039;test&#039;&gt;Test&lt;/a&gt;'
    var result = htmlspecialchars("<a href='test'>Test</a>", 'ENT_QUOTES')
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    var expected = 'ab"c&#039;d'
    var result = htmlspecialchars("ab\"c'd", ['ENT_NOQUOTES', 'ENT_QUOTES'])
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 3', function (done) {
    var expected = 'my &quot;&entity;&quot; is still here'
    var result = htmlspecialchars('my "&entity;" is still here', null, null, false)
    expect(result).to.deep.equal(expected)
    done()
  })
})
