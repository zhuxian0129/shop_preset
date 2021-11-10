const webpack = require("webpack")
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const devServer = {
  host: '0.0.0.0',
  port: 8888,
  inline: false,
  disableHostCheck: true,
  proxy: {
    '/api/private/v1': { // 权限 微服务
      target: 'https://lianghj.top:8888',
      changeOrigin: true
    },
  }
}
module.exports = {
  productionSourceMap: false, // 生产禁止显示源代码
  publicPath: "/",
  outputDir: 'sk/shop_preset',
  assetsDir: 'static',
  devServer: devServer,
  css: {
    loaderOptions: {
      scss: {
        data: `@import "~@/assets/css/_variable.scss";`
      },
      less: {
        lessOptions: {
          globalVars: {
            'primary-color': '#25BFB7',
            'link-color': '#25BFB7',
            'border-radius-base': '2px'
          },
          javascriptEnabled: true
        }
      }
    }
  },
  configureWebpack: config => { // webpack配置，值位对象时会合并配置，为方法时会改写配置
    // if (debug) { // 开发环境配置
    //   config.devtool = 'source-map'
    // } else { // 生产环境配置
    // }
  },
  chainWebpack: config => {
    config.module
    .rule('svg')
    .exclude.add(resolve('src/icons'))
    .end()

    config.module
    .rule('icons')
    .test(/\.svg$/)
    .include.add(resolve('src/icons'))
    .end()
    .use('svg-sprite-loader')
    .loader('svg-sprite-loader')
    .options({
      symbolId: 'icon-[name]'
    })
  }
}
