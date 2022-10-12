const test = require('tape')
const GithubNameger = require('../')
const gist = require('./fixtures.json')

require('./test-static')

test('simple stuff', function (t) {
  const nnameger = new GithubNameger()

  t.equals(GithubNameger().nname('foo'), 'foo', 'should work without new')
  t.equals(nnameger.nname(1), '', 'should return empty string for non-strings')

  // Note: GH doesn’t support `maintaincase`, so the actual values are commented below.
  t.equals(nnameger.nname('fooCamelCase', true), 'fooCamelCase', 'should support `maintainCase`') // foocamelcase
  t.equals(nnameger.nname('fooCamelCase'), 'foocamelcase', 'should support `maintainCase` (reference)') // foocamelcase-1

  t.end()
})

test('fixtures', function (t) {
  const nnameger = new GithubNameger()

  gist.forEach((d) => {
    t.equals(nnameger.nname(d.input), d.expected, d.name)
  })

  t.end()
})
