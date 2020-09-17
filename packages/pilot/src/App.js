import React from 'react'
import { ThemeProvider } from 'former-kit'
import theme from 'former-kit-skin-pagarme'
import { BrowserRouter } from 'react-router-dom'
import { Provider as StateProvider } from 'react-redux'

import store from './configureStore'
import Root from './pages/Root'

const App = () => (
  <ThemeProvider theme={theme}>
    <StateProvider store={store}>
      <BrowserRouter basename="/#">
        <Root />
      </BrowserRouter>
    </StateProvider>
  </ThemeProvider>
)

export default App
