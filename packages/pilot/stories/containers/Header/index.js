import React from 'react'
import { path, split } from 'ramda'
import { action } from '@storybook/addon-actions'
import Section from '../../Section'
import Header from '../../../src/containers/Header'

import translations from '../../../public/locales/pt/translations.json'

const t = sentence => path(split('.', sentence), translations)

const MessageExample = () => {
  const company = { type: 'self_register' }
  const user = {
    email: 'user@example.com',
    name: 'Bombas Diesel Muzambinho | Lima Mecanica De Veiculos Automotores Eireli - Me',
  }

  return (
    <Section>
      <Header
        company={company}
        onBack={action('onBack')}
        onBackToOldVersion={action('onBackToOldVersion')}
        onLogout={action('onLogout')}
        onWelcome={action('onWelcome')}
        routes={[]}
        t={t}
        showWelcomeButton
        user={user}
      />
    </Section>
  )
}

export default MessageExample
