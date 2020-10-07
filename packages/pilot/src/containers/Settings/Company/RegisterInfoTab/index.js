import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  CardContent,
  CardTitle,
} from 'former-kit'
import CompanyBankAccount from '../../BankAccount'

const RegisterInfoTab = ({
  bankAccountActionsDisabled,
  bankAccountChangeActionDisabled,
  bankAccountData,
  bankAccountErrors,
  bankAccountSelected,
  bankAccountSelectedView,
  bankAccounts,
  isPaymentLink,
  onBankAccountCancel,
  onBankAccountChange,
  onBankAccountCreate,
  onBankAccountSelect,
  t,
}) => (
  <Fragment>
    {!isPaymentLink && (
      <Fragment>
        <CardTitle
          title={t('pages.settings.company.card.register.bank_title')}
        />
        <CardContent>
          <CompanyBankAccount
            accounts={bankAccounts}
            changeActionDisabled={bankAccountChangeActionDisabled}
            data={bankAccountData}
            disabled={bankAccountActionsDisabled}
            errors={bankAccountErrors}
            onAccountSelect={onBankAccountSelect}
            onCancel={onBankAccountCancel}
            onChange={onBankAccountChange}
            onSubmit={onBankAccountCreate}
            selectedAccount={bankAccountSelected}
            selectedView={bankAccountSelectedView}
            t={t}
          />
        </CardContent>
      </Fragment>
    )}
  </Fragment>
)

const bankAccountShape = {
  agencia: PropTypes.string,
  agencia_dv: PropTypes.string,
  bank_code: PropTypes.string,
  conta: PropTypes.string,
  conta_dv: PropTypes.string,
  document_number: PropTypes.string,
  document_type: PropTypes.string,
  id: PropTypes.number,
  legal_name: PropTypes.string,
  type: PropTypes.string,
}

RegisterInfoTab.propTypes = {
  bankAccountActionsDisabled: PropTypes.bool.isRequired,
  bankAccountChangeActionDisabled: PropTypes.bool.isRequired,
  bankAccountData: PropTypes.shape({
    account: PropTypes.string,
    accountCd: PropTypes.string,
    agency: PropTypes.string,
    agencyCd: PropTypes.string,
    bankCode: PropTypes.string,
    documentNumber: PropTypes.string.isRequired,
    legalName: PropTypes.string.isRequired,
    type: PropTypes.string,
  }),
  bankAccountErrors: PropTypes.shape({
    account: PropTypes.string,
    accountCd: PropTypes.string,
    agency: PropTypes.string,
    agencyCd: PropTypes.string,
    bankCode: PropTypes.string,
    type: PropTypes.string,
  }),
  /* eslint-disable max-len, react/sort-prop-types */
  bankAccounts: PropTypes.arrayOf(PropTypes.shape(bankAccountShape).isRequired).isRequired,
  bankAccountSelected: PropTypes.shape(bankAccountShape).isRequired,
  bankAccountSelectedView: PropTypes.oneOf([
    'addition',
    'selection',
  ]).isRequired,
  isPaymentLink: PropTypes.bool.isRequired,
  onBankAccountCancel: PropTypes.func.isRequired,
  onBankAccountChange: PropTypes.func.isRequired,
  onBankAccountCreate: PropTypes.func.isRequired,
  onBankAccountSelect: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

RegisterInfoTab.defaultProps = {
  bankAccountData: {
    account: '',
    accountCd: '',
    agency: '',
    agencyCd: '',
    bankCode: '',
    type: '',
  },
  bankAccountErrors: null,
}

export default RegisterInfoTab
