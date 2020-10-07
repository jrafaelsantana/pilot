import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  CardTitle,
  TabBar,
  TabItem,
} from 'former-kit'

import ProfileInfoTab from './ProfileInfoTab'
import PasswordRedefinitionForm from './PasswordRedefinitionForm'

import style from './style.css'

class UserSettings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: 0,
    }
    this.changeTab = this.changeTab.bind(this)
  }

  changeTab (selectedIndex) {
    this.setState({ selectedIndex })
  }

  render () {
    const {
      address,
      general,
      handlePasswordFormSubmit,
      managingPartner,
      passwordFormStatus,
      t,
    } = this.props

    const {
      selectedIndex,
    } = this.state

    return (
      <>
        <TabBar
          onTabChange={this.changeTab}
          selected={selectedIndex}
          variant="just-text"
        >
          <TabItem text={t('pages.settings.user.tabs.profile_info')} />
          <TabItem text={t('pages.settings.user.tabs.change_password')} />
        </TabBar>

        <div className={style.tabsContainer}>
          {
            selectedIndex === 0
            && (
              <ProfileInfoTab
                address={address}
                general={general}
                managingPartner={managingPartner}
                t={t}
              />
            )
          }
          {
            selectedIndex === 1
            && (
              <Card>
                <CardTitle
                  title={t('pages.settings.user.card.access.title')}
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
  passwordFormStatus: PropTypes.shape({
    error: PropTypes.string,
    success: PropTypes.bool,
  }),
  t: PropTypes.func,
}

UserSettings.defaultProps = {
  passwordFormStatus: {
    error: null,
    success: false,
  },
  t: t => t,
}

export default UserSettings
