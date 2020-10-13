import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  CardContent,
  SegmentedSwitch,
} from 'former-kit'

import BankAccountForm from './Add'
import BankAccountSelector from './Selector'

class BankAccount extends Component {
  constructor () {
    super()

    this.state = {
      selected: 'selection',
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps ({ selectedView }) {
    this.handleChange(selectedView)
  }

  handleChange (selected) {
    this.setState({
      selected,
    })
  }

  render () {
    const {
      selected,
    } = this.state

    const {
      accounts,
      changeActionDisabled,
      data,
      disabled,
      errors,
      onAccountSelect,
      onCancel,
      onChange,
      onSubmit,
      selectedAccount,
      t,
    } = this.props

    const viewAddAccount = selected === 'addition'
    const viewSelectAccount = selected === 'selection'

    return (
      <>
        <CardContent>
          <SegmentedSwitch
            name="select"
            onChange={this.handleChange}
            options={[
              {
                title: t('pages.settings.user.banking_info.select_account'),
                value: 'selection',
              },
              {
                title: t('pages.settings.user.banking_info.add'),
                value: 'addition',
              },
            ]}
            value={selected}
          />
        </CardContent>

        {viewSelectAccount
          && (
            <BankAccountSelector
              accounts={accounts}
              disabled={changeActionDisabled}
              onSelect={onAccountSelect}
              selectedAccountId={selectedAccount.id}
              t={t}
            />
          )
        }

        {viewAddAccount
          && (
            <BankAccountForm
              actionsDisabled={disabled}
              data={data}
              disabled={changeActionDisabled}
              errors={errors}
              onChange={onChange}
              onCancel={onCancel}
              onSubmit={onSubmit}
              t={t}
            />
          )
        }
      </>
    )
  }
}

const accountShape = {
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

BankAccount.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.shape(accountShape)).isRequired,
  changeActionDisabled: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    account: PropTypes.string,
    accountCd: PropTypes.string,
    agency: PropTypes.string,
    agencyCd: PropTypes.string,
    bankCode: PropTypes.string,
    documentNumber: PropTypes.string.isRequired,
    legalName: PropTypes.string.isRequired,
    type: PropTypes.string,
  }),
  disabled: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    account: PropTypes.string,
    accountCd: PropTypes.string,
    agency: PropTypes.string,
    agencyCd: PropTypes.string,
    bankCode: PropTypes.string,
    type: PropTypes.string,
  }),
  onAccountSelect: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selectedAccount: PropTypes.shape(accountShape).isRequired,
  selectedView: PropTypes.oneOf([
    'addition', 'selection',
  ]),
  t: PropTypes.func.isRequired,
}

BankAccount.defaultProps = {
  data: {
    account: '',
    accountCd: '',
    agency: '',
    agencyCd: '',
    bankCode: '',
    type: '',
  },
  errors: null,
  selectedView: 'selection',
}

export default BankAccount
