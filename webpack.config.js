/* webpack 就是 node 的一个模块 */
const path = require('path');
// 引入 html 模板插件 
const HtmlWebpackP = require('html-webpack-plugin')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const MiniCssExtractP = require('mini-css-extract-plugin');
module.exports = {
  mode: 'production', // development 
  // 打包入口文件（单页） 
  entry: {
    // 全局变量  
    app: path.resolve(__dirname, 'src/index.js')
  },
  // entry: {
  //   pageOne: './src/elem-div.js',
  //   pageTwo: './src/elem-p.js',
  //   pageThree: './src/index.js'
  // },
  // 输出目录
  output: {
    filename: '[name]-[chunkhash:8].js',
    path: path.resolve(__dirname, 'dist')
  },
  // loader 的加载顺序是，从后往前，从下往上。
  module: {
    // module.rules : 将符合条件的模块，交给对应的loader处理
    rules: [
      {
        test: /\.css$/, //匹配以.css结尾的文件
        use: [
          /*{
            loader: 'style-loader',
            // 设置选项
            options: {
              singleton: true // 合并成一个style标签
            }
          },*/
          // 我们打包到独立文件，就不需要style了
          MiniCssExtractP.loader,
          {
            loader: 'css-loader',
            options: { // CSS 模块化
              modules: true
            }
          }
        ],
        include: path.resolve(__dirname, 'src/css')
      },
      {
        test: /\.less$/, //匹配以.less结尾的文件
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    // 实例化这个插件
    new HtmlWebpackP({
      filename: 'index.html'
    }),
    // 清除dist目录
    new CleanWebpackPlugin(),
    new MiniCssExtractP({
      filename: '[contenthash].css'   
    })
  ]
}