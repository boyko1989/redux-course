const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: [
      path.join(__dirname, 'src', 'index'),
    ],
    // modules: [],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.[contenthash].js'
  },
  devServer: {
    watchFiles: path.join(__dirname, 'src'),
    port: 4220,
    hot: true,
    compress: true
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: 'index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin ({
      filename: '[name].[contenthash].css',
    }),
    new FileManagerPlugin({
      events: {
        onStart: {
          delete: ['dist/*']
        },
        // onEnd: {},
      }
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      }
    ]
  }
}
