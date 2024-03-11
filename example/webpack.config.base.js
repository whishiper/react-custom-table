const webpack = require('webpack');
const path = require('path');
const extractTextPlugin = require('extract-text-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const resolve = dir => path.join(__dirname, dir);
module.exports = {
  entry: {
    index: resolve('src/index.js')
  },
  output: {
    path: resolve('dist'),
    filename: 'js/[name].[hash].js'
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('index.html'),
      chunks: 'index'
    })
  ],
  resolve: {
    extensions: ['.js', '.css','.ts','.tsx']
  },
  module: {
    rules: [
      {
        test: /\.js/,
        loader: require.resolve('babel-loader'),
        exclude: /node_modules/,
        options: {
          presets: ['@babel/env', '@babel/react'],

          plugins: [
            ['@babel/plugin-proposal-export-default-from'],
            ["@babel/plugin-proposal-class-properties"]
          ]
        }
      },
      {
        test:/\.tsx?$/,
        use:['ts-loader']
      },
      {
        test: /\.css$/,
        // 从右向左解析 !!!!
        use: [ { loader: 'style-loader' },{ loader: 'css-loader' }]
      }
    ]
  },
};
