import React from 'react'
import PropTypes from 'prop-types'
import Form from 'react-vanilla-form'
import {
  Alert,
  Button,
  FormInput,
  CardContent,
  CardActions,
  RadioGroup,
} from 'former-kit'
import IconWarning from 'emblematic-icons/svg/ExclamationCircle32.svg'
import IconInfo from 'emblematic-icons/svg/InfoCircle32.svg'

import emailValidation from '../../../../../validation/email'
import isPaymentLink from '../../../../../validation/isPaymentLink'

import style from './style.css'

const isEmail = t => emailValidation(t('validations.isEmail'))
const required = t => value => (
  value
    ? null
    : t('pages.settings.user.card.access.field_required')
)
const getPermissionList = (company) => {
  const permissionsList = [
    'admin',
    'read_only',
  ]
  const newArrayValue = isPaymentLink(company)
    ? 'seller'
    : 'read_write'

  return [
    ...permissionsList,
    newArrayValue,
  ]
}

const getValue = (value) => {
  if (value === 'seller') {
    return 'read_write'
  }

  return value
}

const getPermissionValues = (permissionsList, t) => (
  permissionsList.map(item => (
    {
      name: t(`models.user.permission.${item}`),
      value: getValue(item),
    }
  ))
)

class AddNewUserForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentData: {
        email: '',
        permission: '',
      },
      submittedEmail: null,
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleFormOnChange = this.handleFormOnChange.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    const { status: { success } } = nextProps

    if (success) {
      this.setState({
        currentData: {
          email: '',
          permission: '',
        },
      })
    }
  }

  getPermissions () {
    const { company, t } = this.props
    const permissionsList = getPermissionList(company)
    const permissionsValues = getPermissionValues(permissionsList, t)

    return permissionsValues
  }

  handleFormSubmit (data, errors) {
    const { handleCreateUser } = this.props

    if (!errors) {
      this.setState({
        submittedEmail: data.email,
      })
      handleCreateUser(data)
    }
  }

  handleFormOnChange (currentData) {
    this.setState({
      currentData,
    })
  }

  render () {
    const {
      status,
      t,
    } = this.props
    const {
      currentData,
      submittedEmail,
    } = this.state

    return (
      <Form
        data={currentData}
        customErrorProp="error"
        onSubmit={this.handleFormSubmit}
        validation={
          {
            email: [
              required(t),
              isEmail(t),
            ],
            permission: required(t),
          }
        }
        onChange={this.handleFormOnChange}
      >
        <CardContent>
          <div className={style.formContainer}>
            <div className={style.formItem}>
              <p>
                {t('pages.settings.user.team_info.form.identification')}
              </p>

              <FormInput
                label={t('email')}
                name="email"
              />
            </div>

            <div>
              <p>
                {t('pages.settings.user.team_info.form.access_level')}
              </p>

              <RadioGroup
                options={this.getPermissions()}
                name="permission"
              />
            </div>
          </div>

          {status.error
            && (
              <Alert
                type="error"
                icon={<IconWarning height={16} width={16} />}
              >
                <p>{status.error}</p>
              </Alert>
            )
          }
          {status.success
            && (
              <Alert
                type="info"
                icon={<IconInfo height={16} width={16} />}
              >
                {t(
                  'pages.settings.user.team_info.form.success',
                  { email: (submittedEmail) }
                )}
              </Alert>
            )
          }
        </CardContent>

        <CardActions>
          <Button
            size="default"
            type="submit"
            disabled={status.loading}
          >
            Confirmar
          </Button>
        </CardActions>
      </Form>
    )
  }
}

AddNewUserForm.propTypes = {
  company: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }).isRequired,
  handleCreateUser: PropTypes.func.isRequired,
  status: PropTypes.shape({
    error: PropTypes.string,
    loading: PropTypes.bool,
    success: PropTypes.bool,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default AddNewUserForm
