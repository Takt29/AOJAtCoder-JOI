// webpack.config.js
const path = require('path')
const webpack = require('webpack')
const Fiber = require('fibers')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const Mode = process.env.NODE_ENV || 'development'
const isProduction = Mode === 'production'

module.exports = {
  mode: Mode,
  context: path.resolve(__dirname, 'src'),
  entry: './index.tsx',
  output: {
    path: path.join(__dirname, 'output'),
    publicPath: '/',
    filename: 'bundle.js?[contenthash]',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        test: /\.module\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: isProduction
                  ? '[contenthash]'
                  : '[name]_[local]_[contenthash]',
              },
              url: false,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: Fiber,
              },
              sourceMap: !isProduction,
            },
          },
        ],
      },
      // {
      //   test: /\.s[ac]ss$/i,
      //   use: ['style-loader', 'css-loader', 'sass-loader'],
      // },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    port: 3000,
    host: '0.0.0.0',
    allowedHosts: 'all',
    static: {
      directory: path.resolve(__dirname, 'public'),
    }
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  watchOptions: {
    poll: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(Mode),
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
}
