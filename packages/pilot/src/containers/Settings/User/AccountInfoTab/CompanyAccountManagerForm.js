import React from 'react'
import PropTypes from 'prop-types'
import Form from 'react-vanilla-form'
import {
  Col,
  FormInput,
  Grid,
  Row,
} from 'former-kit'
import {
  always,
  complement,
  isNil,
  mapObjIndexed,
  unless,
} from 'ramda'

const replaceNilForString = num => unless(
  complement(isNil),
  always(''),
  num
)

const formatInitialData = mapObjIndexed(replaceNilForString)

const CompanyGeneralForm = ({
  managingPartner,
  t,
}) => {
  const currentFormData = formatInitialData(managingPartner)

  return (
    <Form
      customErrorProp="error"
      data={currentFormData}
      onSubmit={() => {}}
      onChange={() => {}}
    >
      <Grid>
        <Row>
          <Col palm={12} tablet={12} desk={4} tv={4}>
            <FormInput
              disabled
              label={t('pages.settings.user.account_info.managing_partner.form.name')}
              name="name"
              type="text"
            />
          </Col>
          <Col palm={12} tablet={12} desk={2} tv={2}>
            <FormInput
              disabled
              label={t('pages.settings.user.account_info.managing_partner.form.cpf')}
              name="cpf"
              type="text"
            />
          </Col>
          <Col palm={12} tablet={12} desk={2} tv={2}>
            <FormInput
              disabled
              label={t('pages.settings.user.account_info.managing_partner.form.phone')}
              name="phone_number"
              type="text"
            />
          </Col>
        </Row>
      </Grid>
    </Form>
  )
}

CompanyGeneralForm.propTypes = {
  managingPartner: PropTypes.shape({
    cpf: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  t: PropTypes.func,
}

CompanyGeneralForm.defaultProps = {
  t: t => t,
}

export default CompanyGeneralForm
