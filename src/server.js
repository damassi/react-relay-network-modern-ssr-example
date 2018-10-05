import React from 'react'
import express from 'express'
import { Network, Environment, RecordSource, Store } from 'relay-runtime'
import App from './components/App'
import { renderToString } from 'react-dom/server'
import { createRelayEnvironment } from './relayEnvironment'

const app = express()

app.get('/', async (req, res, next) => {
  const environment = createRelayEnvironment()
  renderToString(<App environment={environment} />)
  const relayData = await environment.relaySSRMiddleware.getCache()

  const source = new RecordSource()
  const store = new Store(source)
  const html = renderToString(
    <App
      environment={new Environment({
        network: Network.create(() => relayData[0][1]),
        store,
      })}
    />
  )

  res.status(200).send(`
    <html>
      <head>
        <title>Relay Modern SSR Example</title>
      </head>
      <body>
        <div id="react-root">${html}</div>

        <script>
          window.__RELAY_BOOTSTRAP_DATA__ = ${JSON.stringify(relayData)};
        </script>

        <script src="/assets/artworks.js"></script>
      </body>
    </html>
  `)
})

export default app
