const base = require('./webpack.config.base');
const webpack = require('webpack');
const { default: config } = require('../config');
const { default: createStaticSite, ENTRY } = require('./createStaticSite');

module.exports = {
  ...base,
  entry: {
    [ENTRY]: [
      `webpack-dev-server/client?http://localhost:7777/`,
      'webpack/hot/only-dev-server',
      './src/index.js'
    ]
  },
  devtool: 'eval',
  devServer: {
    index: '/',
    contentBase: base.output.path,
    historyApiFallback: true,
    port: 7777,
    hot: true
  },
  module: {
    noParse: /vendor\/|autoit\.js$/,
    loaders: [
      {
        exclude: /node_modules|vendor/,
        loader: 'babel',
        test: /\.js$/,
        query: {
          plugins: [
            "transform-decorators-legacy",
            ["react-transform", {
              "transforms": [{
                "transform": "react-transform-hmr",
                "imports": ["react"],
                "locals": ["module"]
              }]
            }]
          ]
        }
      },
      { test: /\.json$/, exclude: /node_modules|vendor/, loader: 'json' },
      { test: /\.css$/, exclude: /node_modules/, loader: 'style!css' },
      { test: /\.png$/, loader: 'url?limit=100000&mimetype=image/png' },
      { test: /\.svg$/, loader: 'url?limit=100000&mimetype=image/svg+xml' },
      { test: /\.gif$/, loader: 'url?limit=100000&mimetype=image/gif' },
      { test: /\.jpg|md$/, loader: 'file' }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify('true'),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    createStaticSite(config)
  ]
};
