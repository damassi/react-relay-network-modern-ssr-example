import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { createRelayEnvironment } from './relayEnvironment'

ReactDOM.hydrate(
  <App environment={createRelayEnvironment()} />,
  document.getElementById('react-root')
)

if (module.hot) {
  module.hot.accept()
}
