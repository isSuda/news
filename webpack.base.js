const path = require('path');
const HtmlWebpackP = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractP = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// 判断当前环境是否是 dev 
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  resolve: {
    // 默认值：['.js','.json','mjs', '.wasm']
    extensions: ['.js', '.vue', '.css', '.less', '.json'],
    alias: {
      src: path.resolve(__dirname, 'src')
      // "@": path.resolve(__dirname, 'src')
    }
  },
  entry: {
    app: path.resolve(__dirname, 'src/main.js')
  },
  output: {
    filename: isDev ? '[name]-[hash:8].js' : '[name]-[chunkhash:6].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      { // 处理 样式
        test: /\.css$/, //匹配以.css结尾的文件
        use: [
          // 判断环境 使用 cross-env + process.env.NODE_ENV 
          isDev ? 'vue-style-loader': MiniCssExtractP.loader,
        {
          loader: 'css-loader'
        },
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: [
              require('autoprefixer')()
            ]
          }
        }
      ]
      },
      { // 处理 vue 
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {  // 图片处理 
        test: /\.(png|jpg|jpeg|gif|svg|jfif)$/,
        use: [
          {
            loader: 'url-loader', // 引用路径问题
            options: { 
              // [ext] 占位符 表示后缀
              name: '[name]-[hash:5].[ext]',
              limit: 1024 * 4 , // 1024 = 1kb  
              outputPath: 'images/' 
            }
          }
          // {
          //   // 图片压缩
          //   loader: 'image-webpack-loader'
          // }
        ] 
      },
      { // 处理 JS ES6->ES5
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      },
      { // 处理字体,富媒体等文件
        test: /\.(eot|woff|ttf|woff2|mp4|pdf)$/,
        loader: 'url-loader',
        options: {
          name: 'assets/static/[name]-[hash:5].[ext]'
        }
      }
   ]
  },
  plugins: [
    // 实例化这个插件
    new HtmlWebpackP({
      filename: 'index.html',
      template: './index.html',
      minify: {
        removeComments: true, // 移除注释
        collapseWhitespace: true, // 删除空格
        minifyCSS: true, // 压缩内联样式 
      }
    }),
    // 清除dist目录
    new CleanWebpackPlugin(),
    new MiniCssExtractP({
      filename: isDev ? '[name]-[hash:8].css' : '[name]-[contenthash:6].css'
    }),
    // vue-loader插件，请确保引入
    new VueLoaderPlugin()
  ]
}