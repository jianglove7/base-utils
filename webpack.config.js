const path = require('path')
var webpack = require('webpack')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
  }


const config = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: resolve('dist')
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            include: [resolve('src')]
          }
        ]
      },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
  ]
  };
  
  module.exports = config;
