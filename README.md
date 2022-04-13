# @datamosh-js/seeder [![License: MIT](https://img.shields.io/badge/license-MIT-blue)](https://opensource.org/licenses/MIT) [![code style: standard](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com/)

Standarized seed generation and validation for Datamosh.

Seeder is not idempotent; it uses the current timestamp when creating the seed.

## Example:
```js
const { seeder } = require('@datamosh/seeder')
seeder('really', () => 'interesting', { arguments: ':)' })
// '21620145'
```

Needing something a bit longer...
```js
const { seeder512 } = require('@datamosh/seeder')
seeder512('really', ['really'], { cool: 'args' })
// '33a6b55f2df7d44c24544193f302e76e31a44c1e2ce1c2621d3077a8c6b7d177b1c0bd08bd2319bb16aa2556197ffcd5f521d228865599eecc6645d53f44fd12'
```

## Usage
### `seeder(...arguments?)`
Makes a 4 byte hexadecimal hash
* `arguments <any>`: String coercible metadata used when generating the seed
* Returns: `seed <String>`: 4 byte hexadecimal hash

### `seeder512(...arguments?)`
Makes a SHA512 hexadecimal hash
* `arguments <any>`: String coercible metadata used when generating the seed
* Returns: `seed <String>`: SHA512 hexadecimal hash

### `validate(seed, nibbles?)`
Validate seed from seeder
* `arguments <any>`: Seed to validate
* `nibbles <Number>`: Expected hex [nibble](https://en.wikipedia.org/wiki/Nibble) count
* Returns: `seed <String>`: SHA512 hexadecimal hash