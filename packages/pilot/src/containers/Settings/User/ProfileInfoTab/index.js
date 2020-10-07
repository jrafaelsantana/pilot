import React from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  CardContent,
  CardTitle,
} from 'former-kit'

import CompanyAddressForm from './CompanyAddressForm'
import CompanyAccountManagerForm from './CompanyAccountManagerForm'
import CompanyGeneralForm from './CompanyGeneralForm'

import style from './style.css'

const ProfileInfoTab = ({
  address,
  general,
  managingPartner,
  t,
}) => (
  <div className={style.cardsContainer}>
    <Card>
      <CardTitle title={t('pages.settings.user.profile_info.general.title')} />
      <CardContent>
        <CompanyGeneralForm t={t} general={general} />
      </CardContent>
    </Card>

    <Card>
      <CardTitle title={t('pages.settings.user.profile_info.address.title')} />
      <CardContent>
        <CompanyAddressForm t={t} address={address} />
      </CardContent>
    </Card>

    <Card>
      <CardTitle title={t('pages.settings.user.profile_info.managing_partner.title')} />
      <CardContent>
        <CompanyAccountManagerForm t={t} managingPartner={managingPartner} />
      </CardContent>
    </Card>
  </div>
)

ProfileInfoTab.propTypes = {
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
  managingPartner: PropTypes.shape({
    cpf: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default ProfileInfoTab
