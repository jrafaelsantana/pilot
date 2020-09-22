import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Spacing } from 'former-kit'

const SpacedAmount = ({ minusSign, symbol, value }) => (
  <Fragment>
    <span>{minusSign + symbol}</span>
    <Spacing />
    {value}
  </Fragment>
)

SpacedAmount.propTypes = {
  minusSign: PropTypes.string.isRequired,
  symbol: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
}

export default SpacedAmount
