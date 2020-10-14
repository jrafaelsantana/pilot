import React from 'react'
import PropTypes from 'prop-types'
import {
  Alert,
  Card,
  CardTitle,
  CardContent,
  SegmentedSwitch,
} from 'former-kit'

import IconWarning from 'emblematic-icons/svg/ExclamationCircle32.svg'
import IconInfo from 'emblematic-icons/svg/InfoCircle32.svg'
import AddNewUserForm from './AddNewUserForm'
import UserTable from './UserTable'

/* eslint-disable sort-keys */
const switchOptions = {
  list: 0,
  add: 1,
}
/* eslint-enable sort-keys */

class MenagementTeam extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      switchOption: switchOptions.list,
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (switchOption) {
    this.setState({
      switchOption,
    })
  }

  render () {
    const {
      company,
      createUserStatus,
      deleteUserStatus,
      handleCreateUser,
      handleDeleteUser,
      t,
      team,
    } = this.props

    const {
      loadingCreateUser,
      switchOption,
    } = this.state
    return (
      <Card>
        <CardTitle title={t('pages.settings.user.team_info.title')} titleSize="large" />
        <CardContent>
          <SegmentedSwitch
            name="select"
            onChange={this.handleChange}
            options={[
              {
                title: 'Visualizar equipe',
                value: switchOptions.list,
              },
              {
                title: 'Adicionar usuário',
                value: switchOptions.add,
              },
            ]}
            value={switchOption}
          />
        </CardContent>
        {switchOption === switchOptions.list && (
          <>
            <CardContent>
              {(deleteUserStatus.error || deleteUserStatus.success) && (
                <>
                  {deleteUserStatus.error
                    && (
                      <Alert
                        type="error"
                        icon={<IconWarning height={16} width={16} />}
                      >
                        <p>{deleteUserStatus.error}</p>
                      </Alert>
                    )
                  }
                  {deleteUserStatus.success
                    && (
                      <Alert
                        type="info"
                        icon={<IconInfo height={16} width={16} />}
                      >
                        <p>{t('pages.settings.user.team_info.delete_user_success')}</p>
                      </Alert>
                    )
                  }
                </>
              )}
              <UserTable
                company={company}
                handleDeleteUser={handleDeleteUser}
                t={t}
                team={team}
              />
            </CardContent>
          </>
        )}
        {switchOption === switchOptions.add && (
          <AddNewUserForm
            company={company}
            handleCreateUser={handleCreateUser}
            status={createUserStatus}
            loading={loadingCreateUser}
            t={t}
          />
        )}
      </Card>
    )
  }
}

MenagementTeam.propTypes = {
  company: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }).isRequired,
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
  handleCreateUser: PropTypes.func.isRequired,
  handleDeleteUser: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  team: PropTypes.arrayOf(PropTypes.shape({
    date_created: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
  })).isRequired,
}

export default MenagementTeam
