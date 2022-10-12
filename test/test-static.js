const test = require('tape')
const GithubNameger = require('../')

test('static method - simple stuff', function (t) {
  const nname = GithubNameger.nname

  t.equals(nname('foo'), 'foo')
  t.equals(nname('foo bar'), 'foo-bar')
  t.equals(nname('foo'), 'foo') // idem potent

  // Note: GH doesn’t support `maintaincase`, so the actual values are commented below.
  t.equals(nname('fooCamelCase', true), 'fooCamelCase') // foocamelcase
  t.equals(nname('fooCamelCase'), 'foocamelcase') // foocamelcase

  t.end()
})

test('static method - yielding empty strings', function (t) {
  const nname = GithubNameger.nname

  t.equals(nname(1), '', 'should return empty string for non-strings')
  t.equals(nname(' '), '-')

  t.end()
})
