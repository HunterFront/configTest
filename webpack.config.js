const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const ESLintPlugin = require('eslint-webpack-plugin');
const HappyPack = require('happypack');
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');

module.exports = {
  context: path.resolve(),
  mode: 'production',
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
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'thread-loader',
            options: {
              worker: 4
            }
          },
          'babel-loader?cacheDirectory'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    // new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    // new ESLintPlugin({
    //   extensions: ['js', 'vue', 'ts']
    // })
    // new HappyPack({
    //   // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
    //   id: 'babel',
    //   // 如何处理 .js 文件，用法和 Loader 配置中一样
    //   loaders: ['babel-loader?cacheDirectory']
    //   // ... 其它配置项
    // }),
    // new HappyPack({
    //   id: 'css',
    //   // 如何处理 .css 文件，用法和 Loader 配置中一样
    //   loaders: ['css-loader']
    // })
    // 告诉 Webpack 使用了哪些动态链接库
    new DllReferencePlugin({
      // 描述 react 动态链接库的文件内容
      manifest: require('./dist/vue.manifest.json')
    }),
    new DllReferencePlugin({
      // 描述 polyfill 动态链接库的文件内容
      manifest: require('./dist/polyfill.manifest.json')
    }),
    new DllReferencePlugin({
      // 描述 polyfill 动态链接库的文件内容
      manifest: require('./dist/vueclass.manifest.json')
    })
  ],
  target: ['web', 'es5'],

  devtool: false
};
