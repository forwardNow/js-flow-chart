const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development', // "production" | "development"

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8080,
    hot: true,
    open: true,
  },

  entry: './src/tree.js',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './dist'),
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, use: [...getCssLoaders()] },
      { test: /\.scss$/, exclude: /node_modules/, loader: [...getCssLoaders(), 'sass-loader'] },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  externals: {
    jquery: 'window.jQuery',
  },
};

function getCssLoaders() {
  return [
    // {
    //   loader: MiniCssExtractPlugin.loader,
    //   options: {
    //     // publicPath: '../',
    //   },
    // },
    'style-loader',
    'css-loader',
    'postcss-loader',
  ];
}
