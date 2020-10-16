import React from 'react'
import { Card } from 'former-kit'

import Antifraud from '../../../../src/containers/Settings/Company/AntifraudInfoTab'

const AntifraudSettings = () => (
  <Card>
    <Antifraud t={t => t} />
  </Card>
)

export default AntifraudSettings
