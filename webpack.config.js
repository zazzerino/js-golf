const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './resources',
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
	test: /\.m?js$/,
	exclude: /(node_modules|bower_components)/,
	use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
	}
      },
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
