// warning: This file is auto generated by `npm run build:tests`
// Do not edit by hand!
process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var array_intersect_ukey = require('../../../../src/php/array/array_intersect_ukey.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/array/array_intersect_ukey.js (tested in test/languages/php/array/test-array_intersect_ukey.js)', function () {
  it('should pass example 1', function (done) {
    var expected = {blue: 1, green: 3}
    var $array1 = {blue: 1, red: 2, green: 3, purple: 4}
    var $array2 = {green: 5, blue: 6, yellow: 7, cyan: 8}
    var result = array_intersect_ukey ($array1, $array2, function (key1, key2){ return (key1 === key2 ? 0 : (key1 > key2 ? 1 : -1)); })
    expect(result).to.deep.equal(expected)
    done()
  })
})
