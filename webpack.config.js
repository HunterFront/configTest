const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  context: path.resolve(),
  mode: 'development',
  entry: ['./src/main.js', './src/my.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    proxy: {
      '/': {
        target: 'http://localhost:3000'
        // pathRewrite: { '^/api': '' }
      }
    },
    open: true,
    port: 8088
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' },
      // { test: /\.css$/i, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        // use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: ['vue-loader']
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['ts-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    // new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin()
  ]
};
