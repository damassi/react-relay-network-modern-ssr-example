import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { createRelayEnvironment } from './relayEnvironment'

const environment = createRelayEnvironment(window.__RELAY_BOOTSTRAP_DATA__)

ReactDOM.hydrate(
  <App environment={environment} />,
  document.getElementById('react-root')
)

if (module.hot) {
  module.hot.accept()
}
