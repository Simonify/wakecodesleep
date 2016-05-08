const base = require('./webpack.config.base');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { default: config } = require('../config');
const { default: createStaticSite, ENTRY } = require('./createStaticSite');

module.exports = {
  ...base,
  entry: {
    [ENTRY]: './src/index.js'
  },
  devtool: 'hidden-source-map',
  module: {
    noParse: /vendor\/|autoit\.js$/,
    loaders: [
      {
        exclude: /node_modules|vendor/,
        loader: 'babel',
        test: /\.js$/,
        query: {
          plugins: ["transform-decorators-legacy"]
        }
      },
      { test: /\.json$/, exclude: /node_modules|vendor/, loader: 'json' },
      { test: /\.css$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract('css') },
      { test: /\.png$/, loader: 'url?limit=100000&mimetype=image/png' },
      { test: /\.svg$/, loader: 'url?limit=100000&mimetype=image/svg+xml' },
      { test: /\.gif$/, loader: 'url?limit=100000&mimetype=image/gif' },
      { test: /\.jpg|md$/, loader: 'file' }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name]-[hash].css'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify('true'),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    }),
    createStaticSite(config)
  ]
};
