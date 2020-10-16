import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardTitle,
  Col,
  FormDropdown,
  FormInput,
  Grid,
  Row,
} from 'former-kit'
import Form from 'react-vanilla-form'

import lessThan from '../../../../validation/lessThan'
import numberValidation from '../../../../validation/number'
import requiredValidation from '../../../../validation/required'

const BoletoForm = ({
  daysToAddInExpirationDate,
  disabled,
  instructions,
  instructionsOptions,
  onCancel,
  onChange,
  onSubmit,
  t,
}) => {
  const isNumber = numberValidation(t('pages.settings.company.boleto.number'))
  const isRequired = requiredValidation(t('pages.settings.company.boleto.required'))
  const daysToAddInExpirationDateLabel = t('pages.settings.company.boleto.daysToAddInExpirationDate.label')

  const validation = {
    daysToAddInExpirationDate: [
      isRequired,
      isNumber,
      lessThan(
        0,
        t('pages.settings.company.boleto.greater_than_or_equal')
      ),
    ],
    instructions: isRequired,
  }

  return (
    <Card>
      <CardTitle title={t('pages.settings.company.card.product.boleto.title')} />
      <Form
        data={{
          daysToAddInExpirationDate,
          instructions,
        }}
        onChange={onChange}
        onSubmit={onSubmit}
        validateOn="blur"
        validation={validation}
      >
        <CardContent>
          <Grid>
            <Row flex>
              <Col
                desk={2}
                palm={2}
                tablet={2}
                tv={2}
              >
                <FormInput
                  disabled={disabled}
                  label={daysToAddInExpirationDateLabel}
                  name="daysToAddInExpirationDate"
                />
              </Col>

              <Col
                desk={6}
                palm={6}
                tablet={6}
                tv={6}
              >
                <FormDropdown
                  disabled={disabled}
                  key={instructions}
                  label={t('pages.settings.company.boleto.instructions.label')}
                  name="instructions"
                  options={instructionsOptions}
                  placeholder={t('pages.settings.company.boleto.instructions.placeholder')}
                />
              </Col>
            </Row>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            disabled={disabled}
            fill="outline"
            onClick={onCancel}
            type="reset"
          >
            {t('pages.settings.company.cancel')}
          </Button>
          <Button
            disabled={disabled}
            type="submit"
          >
            {t('pages.settings.company.confirm')}
          </Button>
        </CardActions>
      </Form>
    </Card>
  )
}

BoletoForm.propTypes = {
  daysToAddInExpirationDate: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  instructions: PropTypes.string.isRequired,
  instructionsOptions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

BoletoForm.defaultProps = {
  disabled: false,
}

export default BoletoForm
