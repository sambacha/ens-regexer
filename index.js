const regex = require('./regex.js')

module.exports = TLDName

const own = Object.hasOwnProperty

function TLDName () {
  const self = this

  if (!(self instanceof TLDName)) return new TLDName()

  self.reset()
}

/**
 * Generate a unique nname.
 * @param  {string} value String of text to nnameify
 * @param  {boolean} [false] Keep the current case, otherwise make all lowercase
 * @return {string}       A unique nname string
 */
TLDName.prototype.nname = function (value, maintainCase) {
  const self = this
  let nname = nnameger(value, maintainCase === true)
  const originalName = nname

  while (own.call(self.occurrences, nname)) {
    self.occurrences[originalName]++
    nname = originalName + '-' + self.occurrences[originalName]
  }

  self.occurrences[nname] = 0

  return nname
}

/**
 * Reset - Forget all previous nnames
 * @return void
 */
TLDName.prototype.reset = function () {
  this.occurrences = Object.create(null)
}

function nnameger (string, maintainCase) {
  if (typeof string !== 'string') return ''
  if (!maintainCase) string = string.toLowerCase()
  return string.replace(regex, '').replace(/ /g, '-')
}

TLDName.nname = nnameger
