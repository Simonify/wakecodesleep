require('app-module-path').addPath(`${__dirname}/../src`);

const path = require('path');

module.exports = {
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name]-[hash].js',
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
}
