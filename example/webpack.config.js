const path = require('path');
const GitVersionWebpackPlugin = require('@cmss/git-version-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, './dist')
  },
  plugins: [new HtmlWebpackPlugin(), new GitVersionWebpackPlugin()]
};
