const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const ESLintPlugin = require('eslint-webpack-plugin');
const HappyPack = require('happypack');
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
const WhtPlugin = require('wht-plugin');

module.exports = {
  context: path.resolve(),
  mode: 'development',
  entry: {
    base: ['./src/base.js'],
    index: ['./src/index.js'],
    page1: ['./src/page1.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_[contenthash:8].js',
    // 指定存放 JavaScript 文件的 CDN 目录 URL
    // publicPath: '//cdn1.com/id/'
    chunkFilename: '[name]_[contenthash:8].js'
  },
  watchOptions: {
    // 不监听的 node_modules 目录下的文件
    ignored: /node_modules/
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    // proxy: {
    //   '/': {
    //     target: 'http://localhost:3000'
    //     // pathRewrite: { '^/api': '' }
    //   }
    // },
    open: true,
    port: 8088
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    },
    // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
    mainFields: ['module', 'browser', 'main']
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        // use: ['style-loader', 'css-loader', 'postcss-loader']
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // publicPath: '//cdn2.com/id/'
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // publicPath: '//cdn2.com/id/'
            }
          },
          'css-loader',
          'sass-loader'
        ]
        // use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: ['wht-loader', 'vue-loader']
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
    new WhtPlugin(),
    new DefinePlugin({}),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/pages/index.html',
      chunks: ['base', 'index']
    }),
    new HtmlWebpackPlugin({
      filename: 'page1.html',
      template: './src/pages/page1.html',
      chunks: ['base', 'page1']
    }),

    // new AddAssetHtmlPlugin([
    //   // Glob to match all of the dll file
    //   {
    //     filepath: path.resolve(__dirname, './dll/*.dll.js'),
    //     outputPath: 'auto'
    //   }
    // ]),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[name].[contenthash].css'
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
    // 开启 Scope Hoisting
    new ModuleConcatenationPlugin()
    // new ESLintPlugin({
    //   extensions: ['js', 'vue', 'ts']
    // })
    // // 告诉 Webpack 使用了哪些动态链接库
    // new DllReferencePlugin({
    //   // 描述 react 动态链接库的文件内容
    //   manifest: require('./dll/vue.manifest.json')
    // }),
    // new DllReferencePlugin({
    //   // 描述 polyfill 动态链接库的文件内容
    //   manifest: require('./dll/polyfill.manifest.json')
    // }),
    // new DllReferencePlugin({
    //   // 描述 polyfill 动态链接库的文件内容
    //   manifest: require('./dll/vueclass.manifest.json')
    // })
    // 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
    // new ParallelUglifyPlugin({
    //   // 传递给 UglifyJS 的参数
    //   uglifyJS: {
    //     output: {
    //       // 最紧凑的输出
    //       beautify: false,
    //       // 删除所有的注释
    //       comments: false
    //     },
    //     compress: {
    //       // 在UglifyJs删除没有用到的代码时不输出警告

    //       // 删除所有的 `console` 语句，可以兼容ie浏览器
    //       drop_console: true,
    //       // 内嵌定义了但是只用到一次的变量
    //       collapse_vars: true,
    //       // 提取出出现多次但是没有定义成变量去引用的静态值
    //       reduce_vars: true
    //     }
    //   }
    // })
  ],
  target: ['web', 'es5'],
  devtool: false,
  stats: {
    // Display bailout reasons
    optimizationBailout: true
  }
};
