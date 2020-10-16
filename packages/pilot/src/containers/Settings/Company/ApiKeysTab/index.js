import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

import ApiKey from './ApiKey'
import Versions from './Versions'

const ApiKeysTab = ({
  apiKeys,
  apiVersion,
  environment,
  hiddenApiKey,
  onVersionChange,
  t,
  userIsReadOnly,
  versions,
}) => (
  <Fragment>
    {!hiddenApiKey
      && (
      <ApiKey
        apiKeys={apiKeys}
        environment={environment}
        t={t}
      />
      )
    }

    {!userIsReadOnly && !hiddenApiKey
      && (
      <Versions
        current={apiVersion}
        environment={environment}
        options={versions}
        onVersionChange={onVersionChange}
        t={t}
        userIsReadOnly={userIsReadOnly}
      />
      )
    }
  </Fragment>
)

ApiKeysTab.propTypes = {
  apiKeys: PropTypes.shape({
    keys: PropTypes.shape({
      apiKey: PropTypes.string.isRequired,
      encryptionKey: PropTypes.string.isRequired,
    }),
    title: PropTypes.string.isRequired,
  }),
  apiVersion: PropTypes.string,
  environment: PropTypes.oneOf([
    'live',
    'test',
  ]).isRequired,
  hiddenApiKey: PropTypes.bool.isRequired,
  onVersionChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  userIsReadOnly: PropTypes.bool.isRequired,
  versions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
}

ApiKeysTab.defaultProps = {
  apiKeys: null,
  apiVersion: null,
}

export default ApiKeysTab
