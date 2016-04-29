
require('app-module-path').addPath(`${__dirname}/../src`);

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StaticRenderPlugin = require('static-site-generator-webpack-plugin');
const getRoutes = require('router/getRoutes').default;
const routes = getRoutes(require('posts').default);

module.exports = {
  entry: {
    bundle: ['./src/index.js'],
    app: [
      `webpack-dev-server/client?http://localhost:7777/`,
      'webpack/hot/only-dev-server',
      './src/index.js'
    ]
  },
  devtool: 'eval',
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
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
      { test: /\.css$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract('css') },
      { test: /\.png$/, loader: 'url?limit=100000&mimetype=image/png' },
      { test: /\.svg$/, loader: 'url?limit=100000&mimetype=image/svg+xml' },
      { test: /\.gif$/, loader: 'url?limit=100000&mimetype=image/gif' },
      { test: /\.jpg|md$/, loader: 'file' }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify('true'),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    new StaticRenderPlugin('bundle', routes.map((route) => route.path))
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].js',
    libraryTarget: 'umd'
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    root: [
      path.join(__dirname, '../'),
      path.join(__dirname, '../src')
    ],
    extensions: ['', '.js']
  }
};
