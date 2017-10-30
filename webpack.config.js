const path = require('path');
const webpack = require('webpack');

const BUILD = './build';
// const DEVTOOL = 'source-map';
const DEVTOOL = 'eval-source-map';

module.exports = {
  devtool: DEVTOOL,
  entry: {
    app: './src/js/app.js'
  },
  output: {
    path: path.resolve(__dirname, BUILD),
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|test)/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, BUILD),
    compress: true,
    port: 8080,
    watchContentBase: true,
    clientLogLevel: 'error'
  }
};
