'use strict'

jest.mock('./utils/now', () => () => '0000000000000')

const { seeder, validate } = jest.requireActual('./index')

describe('seeder', () => {
  it('should return a 4 byte hexadecimal', () => {
    expect.assertions(2)
    const seed = seeder('quasimodo')
    expect(seed).toBe('2294a273')
    expect(seed.length).toBe(8)
  })
  it('should ignore arguments that cannot be coerced to strings', () => {
    expect.assertions(2)
    const badObj = Object.assign({}, { toString: undefined })
    const badFn = Object.assign(() => {}, { toString: undefined })
    const acutalSeed = seeder('al', 'the', badObj, badFn, 'chemist')
    const validSeed = seeder('al', 'the', 'chemist')
    expect(acutalSeed).toBe(validSeed)
    expect(acutalSeed.length).toBe(8)
  })
})

describe('validate', () => {
  it('should return false when passed a hexadecimal larger than 4 bytes', () => {
    expect.assertions(1)
    const mockSeed = '7b964b51ff'
    const result = validate(mockSeed)
    expect(result).toBe(false)
  })
  it('should return false when passed a hexadecimal shorter than 4 bytes', () => {
    expect.assertions(1)
    const mockSeed = '7b964b'
    const result = validate(mockSeed)
    expect(result).toBe(false)
  })
  it('should return false when passed an object', () => {
    expect.assertions(1)
    const mockSeed = {}
    const result = validate(mockSeed)
    expect(result).toBe(false)
  })
  it('should return false when passed a non-hexadecimal string', () => {
    expect.assertions(1)
    const mockSeed = 'zzyyzzyy'
    const result = validate(mockSeed)
    expect(result).toBe(false)
  })
  it('should return true when passed an 4 byte hexadecimal', () => {
    expect.assertions(1)
    const mockSeed = '7b964b51'
    const result = validate(mockSeed)
    expect(result).toBe(true)
  })
  it('should return true when passed an 5 byte hexadecimal and nibbles as 10', () => {
    expect.assertions(1)
    const mockSeed = '7b964b5101'
    const result = validate(mockSeed, 10)
    expect(result).toBe(true)
  })
})
