import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  CardContent,
  TabBar,
  TabItem,
} from 'former-kit'

import GeneralInfoTab from './GeneralInfoTab'
import ProductInfoTab from './ProductInfoTab'

import isPaymentLink from '../../../validation/isPaymentLink'
import isNilOrEmpty from '../../../validation/isNilOrEmpty'

class CompanySettings extends Component {
  constructor (props) {
    super(props)
    this.state = { selectedIndex: 0 }
    this.changeTab = this.changeTab.bind(this)
  }

  changeTab (selectedIndex) {
    this.setState({ selectedIndex })
  }

  render () {
    const {
      antifraud,
      apiKeys,
      apiVersion,
      boletoActionsDisabled,
      boletoDaysToAddInExpirationDate,
      boletoDisabled,
      boletoInstructions,
      boletoInstructionsOptions,
      company,
      environment,
      fees,
      isMDRzao,
      onBoletoSettingsCancel,
      onBoletoSettingsChange,
      onBoletoSettingsSubmit,
      onVersionChange,
      t,
      userIsReadOnly,
      versions,
    } = this.props

    const {
      selectedIndex,
    } = this.state

    return !isNilOrEmpty(company) && (
      <Card>
        <CardContent>
          <TabBar
            onTabChange={this.changeTab}
            selected={selectedIndex}
            variant="just-text"
          >
            <TabItem text={t('pages.settings.company.tab.general')} />
            <TabItem text={t('pages.settings.company.tab.products')} />
          </TabBar>
        </CardContent>
        {selectedIndex === 0
          && (
            <GeneralInfoTab
              apiKeys={apiKeys}
              apiVersion={apiVersion}
              environment={environment}
              fees={fees}
              hiddenApiKey={isPaymentLink(company)}
              isMDRzao={isMDRzao}
              onVersionChange={onVersionChange}
              t={t}
              userIsReadOnly={userIsReadOnly}
              versions={versions}
            />
          )
        }
        {selectedIndex === 1
          && (
            <ProductInfoTab
              antifraud={antifraud}
              boletoActionsDisabled={boletoActionsDisabled}
              boletoDaysToAddInExpirationDate={boletoDaysToAddInExpirationDate}
              boletoDisabled={boletoDisabled}
              boletoHandleCancel={onBoletoSettingsCancel}
              boletoHandleChange={onBoletoSettingsChange}
              boletoHandleSubmit={onBoletoSettingsSubmit}
              boletoInstructions={boletoInstructions}
              boletoInstructionsOptions={boletoInstructionsOptions}
              t={t}
            />
          )
        }
      </Card>
    )
  }
}

CompanySettings.propTypes = {
  antifraud: PropTypes.shape({
    fraud_covered: PropTypes.bool.isRequired,
  }).isRequired,
  apiKeys: PropTypes.shape({
    keys: PropTypes.shape({
      apiKey: PropTypes.string.isRequired,
      encryptionKey: PropTypes.string.isRequired,
    }),
    title: PropTypes.string.isRequired,
  }),
  apiVersion: PropTypes.string,
  boletoActionsDisabled: PropTypes.bool.isRequired,
  boletoDaysToAddInExpirationDate: PropTypes.string,
  boletoDisabled: PropTypes.bool.isRequired,
  boletoInstructions: PropTypes.string,
  boletoInstructionsOptions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  company: PropTypes.shape({
    type: PropTypes.string,
  }),
  createUserStatus: PropTypes.shape({
    error: PropTypes.string,
    loading: PropTypes.bool,
    success: PropTypes.bool,
  }).isRequired,
  deleteUserStatus: PropTypes.shape({
    error: PropTypes.string,
    loading: PropTypes.bool,
    success: PropTypes.bool,
  }).isRequired,
  environment: PropTypes.oneOf([
    'live',
    'test',
  ]).isRequired,
  fees: PropTypes.shape({
    anticipation: PropTypes.number,
    antifraud: PropTypes.number,
    boleto: PropTypes.number,
    gateway: PropTypes.number,
    installments: PropTypes.arrayOf(PropTypes.shape({
      installment: PropTypes.number.isRequired,
      mdr: PropTypes.number.isRequired,
    })),
    transfer: PropTypes.number,
  }).isRequired,
  isMDRzao: PropTypes.bool.isRequired,
  onBoletoSettingsCancel: PropTypes.func.isRequired,
  onBoletoSettingsChange: PropTypes.func.isRequired,
  onBoletoSettingsSubmit: PropTypes.func.isRequired,
  onVersionChange: PropTypes.func.isRequired,
  t: PropTypes.func,
  userIsReadOnly: PropTypes.bool.isRequired,
  versions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
}

CompanySettings.defaultProps = {
  apiKeys: null,
  apiVersion: null,
  boletoDaysToAddInExpirationDate: null,
  boletoInstructions: null,
  company: null,
  t: t => t,
}

export default CompanySettings
