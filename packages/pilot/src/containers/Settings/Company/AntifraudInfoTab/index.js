import PropTypes from 'prop-types'
import React from 'react'

import {
  Card,
  CardContent,
  CardTitle,
} from 'former-kit'

const Antifraud = ({ t }) => (
  <Card>
    <CardTitle title={t('pages.settings.company.antifraud.title')} />
    <CardContent>
      <p>
        <strong>{t('pages.settings.company.antifraud.fraud_coverage.title')}</strong>
      </p>

      <p>{t('pages.settings.company.antifraud.fraud_coverage.description')}</p>
    </CardContent>
  </Card>
)

Antifraud.propTypes = {
  t: PropTypes.func.isRequired,
}

export default Antifraud
