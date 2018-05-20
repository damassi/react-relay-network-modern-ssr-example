import React from 'react'
import express from 'express'
import App from './components/App'
import { renderToString } from 'react-dom/server'
import { relaySSRMiddleware } from './relayEnvironment'

const app = express()
export default app

app.get('/', async (req, res, next) => {
  renderToString(<App />)
  const relayData = await relaySSRMiddleware.getCache()
  const html = renderToString(<App />)

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
