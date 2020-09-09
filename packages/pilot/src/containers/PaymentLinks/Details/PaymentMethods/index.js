import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  CardContent,
  CardTitle,
} from 'former-kit'
import percent from '../../../../formatters/percent'
import styles from './styles.css'

const renderCreditCardMessage = (creditCardConfig, t) => {
  const {
    charge_transaction_fee: chargeTransactionFee,
    free_installments: freeInstalments,
    interest_rate: interestRate,
    max_installments: maxInstallments,
  } = creditCardConfig

  if (freeInstalments == null) {
    return (
      <p className={styles.interestRate}>
        {t('pages.payment_link_detail.payment_methods.max_of')}
        <span>{maxInstallments}</span>
        {t('pages.payment_link_detail.payment_methods.no_interest_rate', { count: maxInstallments })}
      </p>
    )
  }

  if (chargeTransactionFee) {
    const hasMultipleTaxes = (
      freeInstalments > 0 && freeInstalments < 12
      && maxInstallments > freeInstalments
    )

    const installmentsGroup = hasMultipleTaxes
      ? [
        { from: 1, to: freeInstalments },
        { from: freeInstalments + 1, to: maxInstallments },
      ]
      : [
        { from: 1, to: maxInstallments },
      ]

    return (
      <Fragment>
        {installmentsGroup.map(({ from, to }) => (
          <p key={from} className={styles.installmentRange}>
            {to > 1 && (
              <span className={styles.from}>
                {t('pages.payment_link_detail.payment_methods.with_interest_rate_2')}
              </span>
            )}
            <span className={styles.range}>
              {t('pages.payment_link_detail.payment_methods.to', {
                count: to,
                from,
                to,
              })}
            </span>
            <span className={styles.to}>
              {to > freeInstalments && freeInstalments < 12
                ? t('pages.payment_link_detail.payment_methods.charge_transaction_fee_interest_rate_taxing', {
                  count: to,
                })
                : t('pages.payment_link_detail.payment_methods.charge_transaction_fee_interest_rate_no_taxing', {
                  count: to,
                })
              }
            </span>
          </p>
        ))}
      </Fragment>
    )
  }

  return (
    <p className={styles.interestRate}>
      {t('pages.payment_link_detail.payment_methods.max_of')}
      <span>{maxInstallments}</span>
      {t('pages.payment_link_detail.payment_methods.installment', { count: maxInstallments })}
      {t('pages.payment_link_detail.payment_methods.with_interest_rate_1')}
      <span>
        {freeInstalments}
      </span>
      {t('pages.payment_link_detail.payment_methods.installment', { count: freeInstalments })}
      <br />
      {t('pages.payment_link_detail.payment_methods.with_interest_rate_2')}
      <span>
        {t('pages.payment_link_detail.payment_methods.to', {
          count: maxInstallments,
          from: freeInstalments + 1,
          to: maxInstallments,
        })}
      </span>
      {t('pages.payment_link_detail.payment_methods.with_interest_rate_3', {
        percent: percent(interestRate),
      })}
    </p>
  )
}

const PaymentMethods = ({
  boletoConfig,
  creditCardConfig,
  t,
}) => (
  <Card>
    <CardTitle title={t('pages.payment_link_detail.payment_methods.title')} />
    <CardContent>
      <div className={styles.row}>
        <div>
          <p className={styles.title}>
            {t('pages.payment_link_detail.payment_methods.credit_title')}
          </p>
          <p className={styles.subtitle}>
            {t('pages.payment_link_detail.payment_methods.credit_subtitle')}
          </p>
          <div className={styles.content}>
            {creditCardConfig
              ? renderCreditCardMessage(creditCardConfig, t)
              : '-'
            }
          </div>
        </div>
        <div>
          <p className={styles.title}>
            {t('pages.payment_link_detail.payment_methods.boleto_title')}
          </p>
          <p className={styles.subtitle}>
            {t('pages.payment_link_detail.payment_methods.boleto_subtitle')}
          </p>
          <span className={styles.content}>
            { boletoConfig
              ? boletoConfig.expires_in
              : '-'
            }
          </span>
        </div>
      </div>
    </CardContent>
  </Card>
)

PaymentMethods.propTypes = {
  boletoConfig: PropTypes.shape({
    expires_in: PropTypes.number,
  }),
  creditCardConfig: PropTypes.shape({
    charge_transaction_fee: PropTypes.bool,
    free_installments: PropTypes.number,
    interest_rate: PropTypes.number,
    max_installments: PropTypes.number,
  }),
  t: PropTypes.func.isRequired,
}

PaymentMethods.defaultProps = {
  boletoConfig: null,
  creditCardConfig: null,
}

export default PaymentMethods
