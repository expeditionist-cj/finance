'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')
// 定义proxy ip 端口
// const proxyUrl = "http://172.16.1.90:8787"
const proxyUrl = "http://172.16.1.90:7000"
// 后端地址 http://172.16.1.90:7000 
function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Element Admin' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 9527 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  lintOnSave: false, // 取消eslint
  productionSourceMap: false,

  // 配置转发代理，只在开发环境有效，生产环境中需要在Nginx中配置代理
  // webpack-dev-server 配置
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // before: require('./mock/mock-server.js') // 启动mock数据
    // webpack-dev-server 动态代理
    proxy: {
      // 模型实例数据源
      'modelDataSource': {
        target: proxyUrl,
        ws: true,
        pathRewrite: {
          '^/modelDataSource': '/modelDataSource'
        }
      },

      // 模型实例
      'modelInstance': {
        target: proxyUrl,
        ws: true,
        pathRewrite: {
          '^/modelInstance': '/modelInstance'
        }
      },
      // 登录
      'auth': {
        target: proxyUrl,
        ws: true,
        pathRewrite: {
          '^/auth': '/auth'
        }
      },
      // 日报
      'fbdr': {
        target: proxyUrl,
        ws: true,
        pathRewrite: {
          '^/fbdr': '/fbdr'
        }
      },
      // 周报
      'fund_balance_week': {
        target: proxyUrl,
        ws: true,
        pathRewrite: {
          '^/fund_balance_week': '/fund_balance_week'
        }
      },
      // 月报
      'bankAccountMonthReport': {
        target: proxyUrl,
        ws: true,
        pathRewrite: {
          '^/bankAccountMonthReport': '/bankAccountMonthReport'
        }
      },

      // 专家经验设置校验
      'model_instance_point_const': {
        target: proxyUrl,
        ws: true,
        pathRewrite: {
          '^/model_instance_point_const': '/model_instance_point_const'
        }
      },
      // 专家经验设置新增
      'model_instance_const': {
        target: proxyUrl,
        ws: true,
        pathRewrite: {
          '^/model_instance_const': '/model_instance_const'
        }
      },
      // 计算点公式校验
      'model_instance_point': {
        target: proxyUrl,
        ws: true,
        pathRewrite: {
          '^/model_instance_point': '/model_instance_point'
        }
      },

      // 计算点公式校验
      'model_instance_point_const': {
        target: proxyUrl,
        ws: true,
        pathRewrite: {
          '^/model_instance_point_const': '/model_instance_point_const'
        }
      },
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set svg-sprite-loader
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
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
