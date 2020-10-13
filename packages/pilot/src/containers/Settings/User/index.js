import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Card,
  CardTitle,
  TabBar,
  TabItem,
} from 'former-kit'

import AccountInfoTab from './AccountInfoTab'
import BankingInfoTab from './BankingInfoTab'
import PasswordRedefinitionForm from './PasswordRedefinitionForm'
import isPaymentLink from '../../../validation/isPaymentLink'

import style from './style.css'

const tabIndexByName = {
  accountInfo: 0,
  bankingInfo: 1,
  password: 2,
}

const UserSettings = ({
  address,
  bankAccountChangeActionDisabled,
  bankAccountSelected,
  bankAccountSelectedView,
  bankAccounts,
  bankActionsDisabled,
  bankData,
  bankErrors,
  company,
  general,
  handlePasswordFormSubmit,
  managingPartner,
  onBankAccountCancel,
  onBankAccountChange,
  onBankAccountCreate,
  onBankAccountSelect,
  passwordFormStatus,
  t,
}) => {
  const [tabIndex, setTabIndex] = useState(0)
  const history = useHistory()

  useEffect(() => {
    if (history.location.state) {
      const tabName = history.location?.state?.tab
      setTabIndex(tabIndexByName[tabName])
    }
  }, [history.location.state])

  const changeTab = (newTabIndex) => {
    setTabIndex(newTabIndex)
  }

  return (
    <>
      <TabBar
        align="start"
        onTabChange={changeTab}
        selected={tabIndex}
        variant="just-text"
      >
        <TabItem text={t('pages.settings.user.tabs.account_info')} />
        <TabItem text={t('pages.settings.user.tabs.banking_info')} />
        <TabItem text={t('pages.settings.user.tabs.change_password')} />
      </TabBar>

      <div className={style.tabsContainer}>
        {
          tabIndex === tabIndexByName.accountInfo
          && (
            <AccountInfoTab
              address={address}
              general={general}
              managingPartner={managingPartner}
              t={t}
            />
          )
        }
        {
          tabIndex === tabIndexByName.bankingInfo
          && (
            <BankingInfoTab
              bankAccounts={bankAccounts}
              bankAccountActionsDisabled={bankActionsDisabled}
              bankAccountData={bankData}
              bankAccountErrors={bankErrors}
              bankAccountSelected={bankAccountSelected}
              bankAccountChangeActionDisabled={bankAccountChangeActionDisabled}
              bankAccountSelectedView={bankAccountSelectedView}
              isPaymentLink={isPaymentLink(company)}
              onBankAccountCancel={onBankAccountCancel}
              onBankAccountChange={onBankAccountChange}
              onBankAccountCreate={onBankAccountCreate}
              onBankAccountSelect={onBankAccountSelect}
              t={t}
            />
          )
        }
        {
          tabIndex === tabIndexByName.password
          && (
            <Card>
              <CardTitle
                title={t('pages.settings.user.card.access.title')}
                titleSize="large"
              />
              <PasswordRedefinitionForm
                onSubmit={handlePasswordFormSubmit}
                status={passwordFormStatus}
                t={t}
              />
            </Card>
          )
        }
      </div>
    </>
  )
}

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

UserSettings.propTypes = {
  address: PropTypes.shape({
    city: PropTypes.string,
    complementary: PropTypes.string,
    neighborhood: PropTypes.string,
    state: PropTypes.string,
    street: PropTypes.string,
    streetNumber: PropTypes.string,
    zipcode: PropTypes.string,
  }).isRequired,
  bankAccountChangeActionDisabled: PropTypes.bool.isRequired,
  bankAccounts: PropTypes.arrayOf(
    PropTypes.shape(bankAccountShape).isRequired
  ).isRequired,
  bankAccountSelected: PropTypes.shape(bankAccountShape).isRequired,
  bankAccountSelectedView: PropTypes.oneOf([
    'addition',
    'selection',
  ]).isRequired,
  bankActionsDisabled: PropTypes.bool.isRequired,
  /* eslint-enable max-len, react/sort-prop-types */
  bankData: PropTypes.shape({
    account: PropTypes.string,
    accountCd: PropTypes.string,
    agency: PropTypes.string,
    agencyCd: PropTypes.string,
    bankCode: PropTypes.string,
    documentNumber: PropTypes.string.isRequired,
    legalName: PropTypes.string.isRequired,
    type: PropTypes.string,
  }),
  bankErrors: PropTypes.shape({
    account: PropTypes.string,
    accountCd: PropTypes.string,
    agency: PropTypes.string,
    agencyCd: PropTypes.string,
    bankCode: PropTypes.string,
    type: PropTypes.string,
  }),
  company: PropTypes.shape({
    type: PropTypes.string,
  }),
  general: PropTypes.shape({
    cnpj: PropTypes.string,
    fullName: PropTypes.string,
    name: PropTypes.string,
    siteUrl: PropTypes.string,
  }).isRequired,
  handlePasswordFormSubmit: PropTypes.func.isRequired,
  managingPartner: PropTypes.shape({
    cpf: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  onBankAccountCancel: PropTypes.func.isRequired,
  onBankAccountChange: PropTypes.func.isRequired,
  onBankAccountCreate: PropTypes.func.isRequired,
  onBankAccountSelect: PropTypes.func.isRequired,
  passwordFormStatus: PropTypes.shape({
    error: PropTypes.string,
    success: PropTypes.bool,
  }),
  t: PropTypes.func,
}

UserSettings.defaultProps = {
  bankData: {
    account: '',
    accountCd: '',
    agency: '',
    agencyCd: '',
    bankCode: '',
    type: '',
  },
  bankErrors: null,
  company: null,
  passwordFormStatus: {
    error: null,
    success: false,
  },
  t: t => t,
}

export default UserSettings
