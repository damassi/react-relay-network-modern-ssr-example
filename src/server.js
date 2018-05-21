import React from 'react'
import express from 'express'
import App from './components/App'
import { renderToString } from 'react-dom/server'
import { createRelayEnvironment } from './relayEnvironment'

const app = express()

app.get('/', async (req, res, next) => {
  const environment = createRelayEnvironment()
  renderToString(<App environment={environment} />)
  const relayData = await environment.relaySSRMiddleware.getCache()
  const html = renderToString(<App environment={environment} />)
  console.log('SERVER:', html)

  try {
    res.status(200).send(`
      <html>
        <head>
          <title>Isomorphic Relay Modern App</title>
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
  } catch (error) {
    console.log('(server.js) Error: ', error) // eslint-disable-line
    next(error)
  }
})

export default app
