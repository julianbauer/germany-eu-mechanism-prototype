var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src',
  output: {
    publicPath: '/'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style!css!autoprefixer'
    }, {
      test: /\.less$/,
      loader: 'style!css!autoprefixer!less'
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel?optional=runtime'
    }, {
      test: /\.(svg|jpg|png)$/,
      loader: 'url'
    }, {
      test: /\.(ttf|eot|woff|woff2)$/,
      loader: 'url'
    }]
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'index.html'
  })],
  resolve: {
    extensions: ['', '.js']
  }
};
