const path = require('path');
const webpack = require('webpack');

const BUILD = './build';
const FLAG = process.env.npm_lifecycle_event;

let ENVIRONMENT = 'development';
let DEVTOOL = 'eval-source-map';

if (FLAG === 'prod') {
  // const DEVTOOL = 'source-map';
  DEVTOOL = '#cheap-module-source-map';
  ENVIRONMENT = 'production';
}

module.exports = {
  devtool: DEVTOOL,
  entry: {
    app: './src/js/app.js',
    demo: './src/js/demo.js'
  },
  output: {
    path: path.resolve(__dirname, BUILD),
    filename: '[name].bundle.js'
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
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(ENVIRONMENT),
        'BABEL_ENV': JSON.stringify(ENVIRONMENT)
      }
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, BUILD),
    compress: true,
    port: 8080,
    watchContentBase: true,
    clientLogLevel: 'error'
  }
};
