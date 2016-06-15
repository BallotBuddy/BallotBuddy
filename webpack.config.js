var path = require('path');
var webpack = require('webpack');
 
module.exports = {
  entry: './client/index.jsx',
  output: { path: __dirname + 'dist', filename: 'bundle.js', publicPath:'/dist/' },
 
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      { 
        test: /\.css$/, 
        loader: "style-loader!css-loader" 
      }
    ]
  },
};
