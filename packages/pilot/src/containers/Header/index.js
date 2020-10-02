import React, { Fragment, isValidElement } from 'react'
import PropTypes from 'prop-types'
import {
  HashRouter,
  Route,
  Switch,
} from 'react-router-dom'

import {
  Avatar,
  Button,
  Header,
  HeaderBackButton,
  HeaderContent,
  HeaderMenu,
  HeaderTitle,
  Spacing,
} from 'former-kit'

import IconArrowDownRight from 'emblematic-icons/svg/ArrowDownRight24.svg'
import IconRocket from './rocket.svg'

import environment, {
  liveUrl,
  testUrl,
} from '../../environment'

import style from './style.css'
import isPaymentLink from '../../validation/isPaymentLink'

const getEnvironmentUrl = () => (
  environment === 'test'
    ? liveUrl
    : testUrl
)

const renderPopoverItems = (sectionTitle, items) => (
  <Fragment>
    <h5 className={style.popoverSectionTitle}>
      {sectionTitle}
    </h5>
    {
    items.map(({ action, title }) => (
      <button
        className={style.popoverItem}
        key={title}
        onClick={action}
        type="button"
      >
        { title }
      </button>
    ))
    }
  </Fragment>
)

const renderTestEnviromentNav = t => (
  <div className={style.testEnvironmentLabel}>
    <p>{t('header.environment.text_test_1')}&nbsp;
      <b>{t('header.environment.text_test_2')}</b>
    </p>
    <a href={liveUrl}>
      {t('header.environment.text_action_test')}
      <IconArrowDownRight height={10} />
    </a>
  </div>
)

const HeaderContainer = ({
  company,
  onBack,
  onBackToOldVersion,
  onLogout,
  onWelcome,
  routes,
  sendTo,
  showWelcomeButton,
  t,
  user,
}) => {
  const companyType = company.type

  const myAccountItems = [
    // { action: () => null, title: t('header.account.account_info') },
    // { action: () => null, title: t('header.account.bank_title') },
    // { action: () => null, title: t('header.account.manage_team') },
    { action: () => sendTo('/account'), title: t('header.account.change_password') },
  ]

  const geralItems = [
    { action: onLogout, title: t('header.exit') },
  ]

  if (isPaymentLink(companyType)) {
    geralItems.unshift({ action: onBackToOldVersion, title: t('header.back_to_old_version') })
  }

  return (
    <Fragment>
      { environment === 'test' && renderTestEnviromentNav(t) }
      <Header>
        <HashRouter>
          <Switch>
            {routes.map(({
              exact,
              icon: Icon,
              path,
              title,
            }) => (
              <Route
                exact={exact}
                key={path}
                path={path}
                render={() => (
                  <Fragment>
                    {!Icon && <HeaderBackButton onClick={onBack} />}
                    {Icon && <Icon width={16} height={16} />}
                    <HeaderTitle>{t(title)}</HeaderTitle>
                  </Fragment>
                )}
              />
            ))}
          </Switch>
        </HashRouter>
        <HeaderContent>
          {showWelcomeButton && (
            <Fragment>
              <Button
                icon={<IconRocket />}
                onClick={onWelcome}
              >
                <span className={style.welcome}>
                  {t('header.welcome')}
                </span>
              </Button>

              <Spacing size="small" />
            </Fragment>
          )}

          <Spacing size="small" />

          <HeaderMenu
            title={(
              <Fragment>
                <Avatar alt={user.name} />
                <span className={style.userName}>{user.name}</span>
              </Fragment>
            )}
          >
            <div className={style.popoverContent}>
              <div className={style.popoverAccountInfo}>
                <h4>{user.name}</h4>
                <p>{user.email}</p>
              </div>

              { environment === 'live' && !isPaymentLink(companyType)
                && (
                <div className={style.popoverEnvironment}>
                  <h5>{t('header.environment.text_live_1')}</h5>
                  <p>
                    {t('header.environment.text_live_2')}&nbsp;
                    <a href={getEnvironmentUrl()}>
                      {t('header.environment.text_action_live')}
                    </a>.
                  </p>
                </div>
                )
              }
              {renderPopoverItems(t('header.account.settings'), myAccountItems)}
              {renderPopoverItems(t('header.account.general'), geralItems)}
            </div>
          </HeaderMenu>
        </HeaderContent>
      </Header>
    </Fragment>
  )
}

HeaderContainer.propTypes = {
  company: PropTypes.shape({
    type: PropTypes.string,
  }),
  onBack: PropTypes.func.isRequired,
  onBackToOldVersion: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onWelcome: PropTypes.func.isRequired,
  routes: PropTypes.arrayOf(PropTypes.shape({
    component: isValidElement,
    exact: PropTypes.bool,
    path: PropTypes.string,
    title: PropTypes.string,
  })).isRequired,
  sendTo: PropTypes.func.isRequired,
  showWelcomeButton: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
}

HeaderContainer.defaultProps = {
  company: {},
}

export default HeaderContainer
