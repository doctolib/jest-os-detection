import nada from '../index'

jest.mock('os', () => ({
  platform: () => 'darwin',
}))

describe('Mac test suite', () => {
  describe('for "it"', () => {
    it.onMac('it.onMac', () => {
      expect(1).toBe(1)
    })

    it.onMac.each([1])('it.onMac.each', value => {
      expect(value).toBe(1)
    })

    it.onMac.skip.each([1])('it.onMac.skip.each', value => {
      throw new Error('Should not be run')
    })

    it.onMac.skip('it.onMac.skip', () => {
      throw new Error('Should not be run')
    })
  })

  describe('for "test"', () => {
    test.onMac('test.onMac', () => {
      expect(1).toBe(1)
    })

    test.onMac.each([1])('test.onMac.each', value => {
      expect(value).toBe(1)
    })

    test.onMac.skip.each([1])('test.onMac.skip.each', value => {
      throw new Error('Should not be run')
    })

    test.onMac.skip('test.onMac.skip', () => {
      throw new Error('Should not be run')
    })
  })

  describe.onMac('describe.onMac', () => {
    it('it', () => {
      expect(1).toBe(1)
    })
  })

  describe.onMac.each(
    [1]
  )('describe.onMac.each', value => {
    it('it', () => {
      expect(value).toBe(1)
    })
  })

  describe.onWindows('describe.onWindows', () => {
    it('it', () => {
      throw new Error('Should not be run')
    })
  })

  describe.onWindows.each(
    [1,2,3]
  )('describe.onWindows.each', () => {
    it('it', () => {
      throw new Error('Should not be run')
    })
  })
})
