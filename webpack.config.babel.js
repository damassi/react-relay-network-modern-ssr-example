import 'dotenv/config'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import WebpackNotifierPlugin from 'webpack-notifier'
import path from 'path'
import webpack from 'webpack'

const { GRAPHQL_ENDPOINT, NODE_ENV, PORT } = process.env

export default {
  mode: NODE_ENV,
  devtool: 'cheap-module-eval-source-map',
  stats: 'errors-only',
  entry: {
    artworks: ['webpack-hot-middleware/client', './src/client.js'],
  },
  // externals: {
  //   graphql: 'graphql', // FIXME: 64:0-70:117 "export 'SourceLocation' was not found in './language'
  // },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public/assets'),
    publicPath: '/assets',
  },
  module: {
    rules: [
      // See: https://github.com/aws/aws-amplify/issues/686#issuecomment-387710340
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.js$/,
        include: /src/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
    ],
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`[App] Listening on http://localhost:${PORT} \n`],
      },
    }),
    new ProgressBarPlugin(),
    new WebpackNotifierPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        GRAPHQL_ENDPOINT: JSON.stringify(GRAPHQL_ENDPOINT),
        NODE_ENV: JSON.stringify(NODE_ENV),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.json'],
    modules: ['src', 'node_modules'],
  },
}
