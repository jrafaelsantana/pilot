import currencyToParts from './currencyToParts'

describe('currencyToParts', () => {
  it('should return the correct value when input is 2000', () => {
    expect(currencyToParts(200000)).toEqual({ minusSign: '', symbol: 'R$', value: '2.000,00' })
  })

  it('should return the correct value when input is 20', () => {
    expect(currencyToParts(20)).toEqual({ minusSign: '', symbol: 'R$', value: '0,20' })
  })

  it('should return the correct value when input is 1', () => {
    expect(currencyToParts(1)).toEqual({ minusSign: '', symbol: 'R$', value: '0,01' })
  })

  it('should return the correct value when input is 0.05', () => {
    expect(currencyToParts(0.05)).toEqual({ minusSign: '', symbol: 'R$', value: '0,00' })
  })

  it('should return the correct value when input is 0', () => {
    expect(currencyToParts(0)).toEqual({ minusSign: '', symbol: 'R$', value: '0,00' })
  })

  it('should return the correct value when input is 1000000000032', () => {
    expect(currencyToParts(1000000000032)).toEqual({ minusSign: '', symbol: 'R$', value: '10.000.000.000,32' })
  })

  it('should return the correct value when input is -1000000000032', () => {
    expect(currencyToParts(-1000000000032)).toEqual({ minusSign: '-', symbol: 'R$', value: '10.000.000.000,32' })
  })

  it('should return the null when input is empty', () => {
    expect(currencyToParts(null)).toBe(null)
    expect(currencyToParts(undefined)).toBe(null)
  })
})
