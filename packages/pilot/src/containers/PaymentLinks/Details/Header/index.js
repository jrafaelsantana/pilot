import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Card,
  CardContent,
} from 'former-kit'

import IconDisable from './IconDisable.svg'

import DetailsItem from './Item'
import styles from './styles.css'
import LinkCopyURL from '../../LinkCopyURL'
import StatusLegend from '../../StatusLegend'

const DetailsHeader = ({
  name,
  onPaymentLinkCancel,
  status,
  t,
  url,
}) => (
  <Card>
    <CardContent>
      <div className={styles.detailsHeader}>
        <DetailsItem title={t('pages.payment_link_detail.header.name')}>
          <span className={styles.linkName}>{name}</span>
        </DetailsItem>
        <DetailsItem title={t('pages.payment_link_detail.header.status')}>
          <StatusLegend t={t} status={status} />
        </DetailsItem>
        <DetailsItem title={t('pages.payment_link_detail.header.url')}>
          <LinkCopyURL status={status} url={url} />
        </DetailsItem>
        <div>
          <Button
            icon={<IconDisable height={16} width={16} />}
            fill="outline"
            onClick={onPaymentLinkCancel}
          >
            {t('pages.payment_link_detail.header.disable_link')}
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
)

DetailsHeader.propTypes = {
  name: PropTypes.string.isRequired,
  onPaymentLinkCancel: PropTypes.func,
  status: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
}

DetailsHeader.defaultProps = {
  onPaymentLinkCancel: () => {},
}

export default DetailsHeader
