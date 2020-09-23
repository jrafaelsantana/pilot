import { isNil } from 'ramda'
import currencyToParts from './currencyToParts'

const currency = (value) => {
  const parts = currencyToParts(value)

  if (isNil(parts)) {
    return null
  }

  return `${parts.minusSign}${parts.symbol} ${parts.value}`
}

export default currency
