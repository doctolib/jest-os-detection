import { patch } from '../src/patch-jest'

patch('linux')

describe('Linux test suite', () => {
  describe('for "it"', () => {
    it.onLinux('it.onLinux', () => {
      expect(1).toBe(1)
    })

    it.onLinux.each([1])('it.onLinux.each', value => {
      expect(value).toBe(1)
    })

    it.onLinux.skip.each([1])('it.onLinux.skip.each', value => {
      throw new Error('Should not be run')
    })

    it.onLinux.skip('it.onLinux.skip', () => {
      throw new Error('Should not be run')
    })
  })

  describe('for "test"', () => {
    test.onLinux('test.onLinux', () => {
      expect(1).toBe(1)
    })

    test.onLinux.each([1])('test.onLinux.each', value => {
      expect(value).toBe(1)
    })

    test.onLinux.skip.each([1])('test.onLinux.skip.each', value => {
      throw new Error('Should not be run')
    })

    test.onLinux.skip('test.onLinux.skip', () => {
      throw new Error('Should not be run')
    })
  })

  describe.onLinux('describe.onLinux', () => {
    it('it', () => {
      expect(1).toBe(1)
    })
  })

  describe.onLinux.each([1])('describe.onLinux.each', value => {
    it('it', () => {
      expect(value).toBe(1)
    })
  })

  describe.onWindows('describe.onWindows', () => {
    it('it', () => {
      throw new Error('Should not be run')
    })
  })

  describe.onWindows.each([1, 2, 3])('describe.onWindows.each', () => {
    it('it', () => {
      throw new Error('Should not be run')
    })
  })
})
