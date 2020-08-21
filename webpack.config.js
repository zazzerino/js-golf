const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      title: 'golf',
    }),
  ],
  module: {
    rules: [
      {
	test: /\.css$/,
	use: [
	  'style-loader',
	  'css-loader',
	],
      },
      {
	test: /\.(png|svg|jpg|gif)$/,
	use: [
	  'file-loader',
	],
      },
    ],
  },
};
