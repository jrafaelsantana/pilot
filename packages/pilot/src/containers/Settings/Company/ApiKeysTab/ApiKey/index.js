import React from 'react'
import PropTypes from 'prop-types'
import copyToClipBoard from 'clipboard-copy'
import {
  Card,
  CardTitle,
  CardContent,
  Col,
  Grid,
  Row,
} from 'former-kit'
import ApiKey from '../../../../../components/ApiKey'
import style from './style.css'

const ApiKeyContainer = ({
  apiKeys,
  t,
}) => (
  <Card>
    <CardTitle title={t('pages.settings.company.card.general.title.api')} />
    <CardContent>
      <Grid>
        <Row stretch>
          <Col
            palm={12}
            tablet={1}
            desk={1}
            tv={1}
          >
            <strong className={style.title}>
              {t(`pages.settings.company.card.general.api_key.${apiKeys?.title}`)}
            </strong>
          </Col>
          <Col
            palm={12}
            tablet={6}
            desk={6}
            tv={6}
          >
            <ApiKey
              title={t('pages.settings.company.card.general.api_key.api')}
              apiKey={apiKeys?.keys?.apiKey}
              copyLabel={t('pages.settings.company.card.general.api_key.copy')}
              onCopy={copyToClipBoard}
            />
          </Col>
          <Col
            palm={12}
            tablet={6}
            desk={5}
            tv={5}
          >
            <ApiKey
              title={t('pages.settings.company.card.general.api_key.encryption_key')}
              apiKey={apiKeys?.keys?.encryptionKey}
              copyLabel={t('pages.settings.company.card.general.api_key.copy')}
              onCopy={copyToClipBoard}
            />
          </Col>
        </Row>
      </Grid>
    </CardContent>
  </Card>
)

ApiKeyContainer.propTypes = {
  apiKeys: PropTypes.shape({
    keys: PropTypes.shape({
      apiKey: PropTypes.string.isRequired,
      encryptionKey: PropTypes.string.isRequired,
    }),
    title: PropTypes.string.isRequired,
  }),
  t: PropTypes.func.isRequired,
}

ApiKeyContainer.defaultProps = {
  apiKeys: {},
}

export default ApiKeyContainer
