// warning: This file is auto generated by `npm run build:tests`
// Do not edit by hand!
process.env.TZ = 'UTC'
var expect = require('chai').expect
var sprintf = require('../../../../src/c/stdio/sprintf.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/c/stdio/sprintf.js (tested in test/languages/c/stdio/test-sprintf.js)', function () {
  it('should pass example 1', function (done) {
    var expected = '    +00001'
    var result = sprintf('%+10.*d', 5, 1)
    expect(result).to.deep.equal(expected)
    done()
  })
})
