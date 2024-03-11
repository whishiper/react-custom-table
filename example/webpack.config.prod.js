const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');
const prodWebpackConfig = merge(baseWebpackConfig, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': (NODE_ENV = 'production')
    })
  ],
  optimization: {
    minimize: true
  }
});
module.exports = prodWebpackConfig;
