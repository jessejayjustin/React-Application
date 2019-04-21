const path = require('path');

const config = {
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: 'build',
  },

  devtool: 'inline-source-map',

  devServer: {
    inline: true,
    host: '127.0.0.1',
    port: 3000,
    historyApiFallback: true,
    disableHostCheck: true,
    contentBase: 'public',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
            loader: 'file-loader',
            options: {}
        }]
      },
      {
        test: /\.css$/, 
        loader: 'style-loader!css-loader'
      },
    ],
  },
};

module.exports = config;
