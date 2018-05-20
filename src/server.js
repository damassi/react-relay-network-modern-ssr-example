import React from 'react'
import express from 'express'
import { renderToString } from 'react-dom/server'
import App from './components/App'

const app = express()
export default app

app.get('/', (req, res, next) => {
  const html = renderToString(<App />)
  console.log(html)
  const relayData = { foo: 'bar' }

  try {
    res.status(200).send(`
      <html>
        <head>
          <title>Isomorphic Relay Modern App</title>
        </head>
        <body>
          <div id="react-root">${html}</div>

          <script>
            window.__BOOTSTRAP__ = ${JSON.stringify(relayData)};
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
