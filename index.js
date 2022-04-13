'use strict'

/*
      ___           ___           ___          _____          ___           ___
     /  /\         /  /\         /  /\        /  /::\        /  /\         /  /\
    /  /:/_       /  /:/_       /  /:/_      /  /:/\:\      /  /:/_       /  /::\
   /  /:/ /\     /  /:/ /\     /  /:/ /\    /  /:/  \:\    /  /:/ /\     /  /:/\:\
  /  /:/ /::\   /  /:/ /:/_   /  /:/ /:/_  /__/:/ \__\:|  /  /:/ /:/_   /  /:/~/:/
 /__/:/ /:/\:\ /__/:/ /:/ /\ /__/:/ /:/ /\ \  \:\ /  /:/ /__/:/ /:/ /\ /__/:/ /:/___
 \  \:\/:/~/:/ \  \:\/:/ /:/ \  \:\/:/ /:/  \  \:\  /:/  \  \:\/:/ /:/ \  \:\/:::::/
  \  \::/ /:/   \  \::/ /:/   \  \::/ /:/    \  \:\/:/    \  \::/ /:/   \  \::/~~~~
   \__\/ /:/     \  \:\/:/     \  \:\/:/      \  \::/      \  \:\/:/     \  \:\
     /__/:/       \  \::/       \  \::/        \__\/        \  \::/       \  \:\
     \__\/         \__\/         \__\/                       \__\/         \__\/

    @datamosh
*/

const { createHash } = require('crypto')
const now = require('./utils/now')

/**
 * Make a SHA512 hexadecimal hash
 * @param  {...any} args String coercible metadata used when generating the seed
 * @returns SHA512 hexadecimal hash
 */
const seeder512 = (...args) => {
  const argsBuff = args?.reduce((acc, val) => {
    if (!val.toString) return acc
    const valBuff = Buffer.from(val.toString())
    return Buffer.concat([acc, valBuff])
  }, Buffer.from(''))

  const hash = createHash('sha512')
  hash.write(now())
  hash.write(argsBuff.toString('utf16le'))

  return hash.digest('hex')
}

/**
 * Make a 4 byte hexadecimal hash
 * @param  {...any} args String coercible metadata used when generating the seed
 * @returns 4 byte hexadecimal hash
 */
const seeder = (...args) => {
  const seed512 = seeder512(...args)
  return seed512.slice(0, 8)
}

/**
 * Validate seed from seeder
 * @param {String} seed Seed to validate
 * @param {Number} nibbles Optional: number of nibbles expected
 */
const validate = (seed, nibbles = 8) => {
  if (seed.constructor.name !== 'String') return false

  // nibble = 4 bits
  if (seed.length !== nibbles) return false

  const hexRegex = /^([0-9A-Fa-f]{2})*$/
  return hexRegex.test(seed)
}

module.exports = {
  seeder,
  seeder512,
  validate
}
