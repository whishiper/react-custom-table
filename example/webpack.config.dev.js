const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');
const devWebpackConfig = merge(baseWebpackConfig, {
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': (NODE_ENV = 'development')
    })
  ],
  devServer: {
    open: true,
    hot: true
  }
});
module.exports = devWebpackConfig;
