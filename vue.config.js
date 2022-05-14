const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 配置路径别名
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
  // 配置代理
  // devServer: {
  //   proxy: {
  //     '/dev-api': {
  //       target: 'http://39.98.123.211/',
  //       // 路径重写
  //       pathRewrite: { '^/dev-api': '' }
  //     }
  //   }
  // }
}
