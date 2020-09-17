import Intl from 'intl'
import { isNil } from 'ramda'
import 'intl/locale-data/jsonp/pt'

const formatter = new Intl.NumberFormat('pt-BR', {
  currency: 'BRL',
  style: 'currency',
})

const concatAmount = parts => parts.reduce((acc, part) => {
  const amountTypes = ['integer', 'decimal', 'group', 'fraction']
  if (amountTypes.includes(part.type)) {
    return acc + part.value
  }

  return acc
}, '')

const currencyToParts = (value) => {
  if (isNil(value)) {
    return null
  }

  const amount = Number(value) / 100

  const parts = formatter.formatToParts(amount)

  return {
    minusSign: parts.find(p => p.type === 'minusSign')?.value,
    symbol: parts.find(p => p.type === 'currency')?.value,
    value: concatAmount(parts),
  }
}

export default currencyToParts
