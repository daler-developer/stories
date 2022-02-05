const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  entry: {
    main: path.join(__dirname, 'src', 'index.js'),
  },
  output: {
    path: path.join(__dirname, 'build'),
    clean: true,
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
    }),
    new MiniCssExtractPlugin(),
  ],
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules'),
    ],
  },
  performance: {
    hints: false
  },
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:4000',
    },
    client: {
      overlay: {
        errors: true,
        warnings: false
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.scss/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
}
