import 'dotenv/config'
import config from './webpack.config.babel'
import express from 'express'
import morgan from 'morgan'
import path from 'path'
import webpack from 'webpack'
import { createReloadable, isDevelopment } from '@artsy/express-reloadable'

const { PORT } = process.env
const app = express()

if (isDevelopment) {
  const compiler = webpack(config)

  app.use(morgan('dev'))
  app.use(require('webpack-hot-middleware')(compiler))
  app.use(
    require('webpack-dev-middleware')(compiler, {
      publicPath: config.output.publicPath,
      serverSideRender: true,
      stats: 'errors-only',
    })
  )

  const mountAndReload = createReloadable(app, require)
  app.use(
    mountAndReload(path.resolve(__dirname, 'src'), {
      watchModules: ['react-relay-network-modern-ssr'],
    })
  )
} else {
  app.use(require('src'))
}

app.listen(PORT, () => {
  console.log(
    isDevelopment
      ? `\n[App] Booting...  \n`
      : `\n[App] Started on http://localhost:5000  \n`
  )
})
