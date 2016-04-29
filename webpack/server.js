const pow = require('node-pow');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const name = process.env.NAME || 'sf';
const server = new WebpackDevServer(webpack(config), {
  contentBase: __dirname + '/../dist/',
  historyApiFallback: true,
  progress: true,
  colors: true,
  inline: true,
  hot: true
});

server.listen(7777, '0.0.0.0', function (err) {
  if (err) {
    console.log(err);
  }

  try {
    pow(name, 7777);
  } catch (err) {
  }

  console.log('Listening on port', 7777);
});
