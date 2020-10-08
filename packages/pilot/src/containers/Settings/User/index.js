import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
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

const tabIndexByName = {
  accountInfo: 0,
  password: 1,
}

const UserSettings = ({
  address,
  general,
  handlePasswordFormSubmit,
  managingPartner,
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
        <TabItem text={t('pages.settings.user.tabs.profile_info')} />
        <TabItem text={t('pages.settings.user.tabs.change_password')} />
      </TabBar>

      <div className={style.tabsContainer}>
        {
            tabIndex === tabIndexByName.accountInfo
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
