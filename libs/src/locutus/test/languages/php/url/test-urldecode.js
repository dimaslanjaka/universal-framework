// warning: This file is auto generated by `npm run build:tests`
// Do not edit by hand!
process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var urldecode = require('../../../../src/php/url/urldecode.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/url/urldecode.js (tested in test/languages/php/url/test-urldecode.js)', function () {
  it('should pass example 1', function (done) {
    var expected = 'Kevin van Zonneveld!'
    var result = urldecode('Kevin+van+Zonneveld%21')
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    var expected = 'https://kvz.io/'
    var result = urldecode('https%3A%2F%2Fkvz.io%2F')
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 3', function (done) {
    var expected = 'https://www.google.nl/search?q=Locutus&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a'
    var result = urldecode('https%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3DLocutus%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a')
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 4', function (done) {
    var expected = '\u597d%3_4'
    var result = urldecode('%E5%A5%BD%3_4')
    expect(result).to.deep.equal(expected)
    done()
  })
})