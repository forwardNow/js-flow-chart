import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default {
  mode: 'development', // "production" | "development"

  entry: './src/main.js',
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
  ],
};

function getCssLoaders() {
  return [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        // publicPath: '../',
      },
    },
    {
      loader: 'css-loader',
    },
  ];
}
