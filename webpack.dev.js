const path = require('path');
const baseWebpackConfig = require('./webpack.base.js')
const merge = require('webpack-merge');

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: 'localhost', 
    port: 9999, 
    compress: true, 
    open: false,  
    overlay: { 
       errors: true 
    },
    hot: true,
    historyApiFallback: { 
    rewrites: [{from: /.*/, to: '/index.html'}]
    },
    proxy: { },
    before(app) {
      const goodsData = require('./goods.json');
      app.get('/goods', (req,res)=>{
        return res.json( goodsData )
      })
    }
  }
})