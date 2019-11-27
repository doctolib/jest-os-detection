import nada from '../index'

jest.mock('os', () => ({
  platform: () => 'win32',
}))

describe('Windows test suite', () => {
  describe('for "it"', () => {
    it.onWindows('it.onWindows', () => {
      expect(1).toBe(1)
    })

    it.onWindows.each([1])('it.onWindows.each', value => {
      expect(value).toBe(1)
    })

    it.onWindows.skip.each([1])('it.onWindows.skip.each', value => {
      throw new Error('Should not be run')
    })

    it.onWindows.skip('it.onWindows.skip', () => {
      throw new Error('Should not be run')
    })
  })

  describe('for "test"', () => {
    test.onWindows('test.onWindows', () => {
      expect(1).toBe(1)
    })

    test.onWindows.each([1])('test.onWindows.each', value => {
      expect(value).toBe(1)
    })

    test.onWindows.skip.each([1])('test.onWindows.skip.each', value => {
      throw new Error('Should not be run')
    })

    test.onWindows.skip('test.onWindows.skip', () => {
      throw new Error('Should not be run')
    })
  })

  describe.onWindows('describe.onWindows', () => {
    it('it', () => {
      expect(1).toBe(1)
    })
  })

  describe.onWindows.each(
    [1]
  )('describe.onWindows.each', value => {
    it('it', () => {
      expect(value).toBe(1)
    })
  })

  describe.onMac('describe.onMac', () => {
    it('it', () => {
      throw new Error('Should not be run')
    })
  })

  describe.onMac.each(
    [1,2,3]
  )('describe.onMac.each', () => {
    it('it', () => {
      throw new Error('Should not be run')
    })
  })
})

