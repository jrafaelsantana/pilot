import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { find, propEq } from 'ramda'
import {
  Button,
  Card,
  CardTitle,
  CardContent,
  Col,
  FormDropdown,
  Grid,
  Modal,
  ModalActions,
  ModalContent,
  ModalTitle,
  Row,
  Spacing,
  Flexbox,
} from 'former-kit'
import style from './style.css'

const Versions = ({
  current,
  environment,
  onVersionChange,
  options,
  t,
}) => {
  const [selected, setSelected] = useState(null)
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    if (options.length && current) {
      const getCurrentVersionFromOptions = propEq('value', current)
      const apiVersion = find(getCurrentVersionFromOptions, options)

      setSelected(apiVersion.value)
    }
  }, [options, current])

  const openModalConfirmation = ({ target }) => {
    setSelected(target.value)
    setOpened(true)
  }

  const handleVersionChange = () => {
    onVersionChange(selected)
    setOpened(false)
  }

  const handleCancel = () => {
    setSelected(current)
    setOpened(false)
  }

  return (
    <Fragment>
      <Card className={style.cardPaddingTop}>
        <CardTitle title={t('select_version_title')} />
        <CardContent>
          <Grid>
            <Row>
              <Col desk={3} tv={4} palm={12}>
                <FormDropdown
                  label={t('select_version_label')}
                  name="api-version"
                  onChange={openModalConfirmation}
                  options={options}
                  value={selected}
                />
              </Col>
            </Row>
          </Grid>
        </CardContent>
      </Card>

      <Modal isOpen={opened}>
        <ModalTitle
          onClose={() => setOpened(false)}
          title={t('select_version_confirm_title')}
        />
        <ModalContent>
          <p className={style.textCenter}>
            {`${t('select_version_confirm_text')}`}&nbsp;
            <a
              href="https://docs.pagar.me/docs/versionamento"
              rel="noopener noreferrer"
            >
              {t('select_version_confirm_link')}
            </a>

            <br />
            <br />

            {t('select_version_confirm_version', {
              env: environment.toUpperCase(),
              version: current,
            })}
          </p>
        </ModalContent>
        <ModalActions>
          <Flexbox
            alignItems="center"
            justifyContent="center"
          >
            <Button
              fill="outline"
              onClick={handleCancel}
            >
              {t('cancel')}
            </Button>
            <Spacing size="small" />
            <Button
              onClick={handleVersionChange}
            >
              {t('confirm')}
            </Button>
          </Flexbox>
        </ModalActions>
      </Modal>
    </Fragment>
  )
}

Versions.propTypes = {
  current: PropTypes.string,
  environment: PropTypes.oneOf([
    'live',
    'test',
  ]).isRequired,
  onVersionChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  t: PropTypes.func.isRequired,
}

Versions.defaultProps = {
  current: '',
}

export default Versions
