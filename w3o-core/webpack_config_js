const path = require('path');
const webpack = require('webpack');
const packageJson = require('./package.json');

module.exports = {
  entry: {
    'ant': './src/index.ts',
    'ant.min': './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist/_bundles'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'Ant',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.VERSION': JSON.stringify(packageJson.version)
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: true,
      include: /\.min\.js$/,
    })
  ],
  module: {
    loaders: [{
      test: /\.tsx?$/,
      loader: 'awesome-typescript-loader',
      exclude: /node_modules/,
      query: {
        declaration: false,
      }
    }]
  }
}