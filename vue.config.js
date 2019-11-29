const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
function resolve(dir) {
  return path.join(__dirname, dir)
}
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const isProduction = process.env.NODE_ENV === 'production';
// vue.config.js
module.exports = {

  //baseUrl:'/',
  publicPath: '/',
  /*
    Vue-cli3:
    Crashed when using Webpack `import()` #2463
    https://github.com/vuejs/vue-cli/issues/2463
   */
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  //   runtimeCompiler:true,
  /*
  pages: {
    index: {
      entry: 'src/main.js',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  */
  // configureWebpack: {},
  configureWebpack: config => {
    // if (process.env.NODE_ENV === 'production') {
    return {
      plugins: [
        new BundleAnalyzerPlugin(),
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
        })
      ]
      // };
    }
  },
  chainWebpack: (config) => {
    // 修复HMR
    /*/、 config.resolve.symlinks(true);*/
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@layout', resolve('src/layout'))
      .set('@static', resolve('src/static'))
  },
  // plugins: [
  //     new BundleAnalyzerPlugin()
  // ],
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          /* less 变量覆盖，用于自定义 ant design 主题 */

          /*
          'primary-color': '#F5222D',
          'link-color': '#F5222D',
          'border-radius-base': '4px',
          */
        },
        javascriptEnabled: true,
      }
    }
  },

  devServer: {
    port: 3000,
    // proxy: {
    /* '/api': {
       target: 'https://mock.ihx.me/mock/5baf3052f7da7e07e04a5116/antd-pro', //mock API接口系统
       ws: false,
       changeOrigin: true,
       pathRewrite: {
         '': ''  //默认所有请求都加了jeecg-boot前缀，需要去掉
       }
     },*/
    // '/AIRW': {
    //   target: 'http://localhost:8080', //请求本地 需要jeecg-boot后台项目
    //   ws: false,
    //   changeOrigin: true
    // },
    // }
    overlay: {
      warnings: false,
      errors: false
    },

  },

  lintOnSave: undefined
}