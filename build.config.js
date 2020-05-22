module.exports = {
  /**
   * 本地开发端口,这个一般不要改
   */
  devPort: "4401",
  /**
   * 要发配的cdn上的资源所在目录,这个一般不要改
   */
  cdnFolder: "assets",
  /**
   * 资源地址,这个一般不要改
   */
  assetsPath: {
    local: "http://localhost:${port}",
    staging: "https://media.choiceform.io/os-client-live",
    prod: "https://media.choiceform.com/os-client-live"
  },
  /**
   * 这个非常重要,如果我们的插件程序`src/plugin`中依赖了第三方包
   * 一般都要在这里配置一下,将这个包单独打出去.
   * 因为我们的插件打包是以入口插件`src/plugin/stanndards`为根的,
   * 所以依赖的包不管是入口插件直接依赖的,还是入口插件依赖其他插件`src/plugins/partials`中的模块,
   * 然后其他插件再依赖第三方包
   * 默认行为下最后这个第三方包的内容都会打入这个入口插件中,导致所有使用过这个第三放包的入口插件都包含这个包的内容,
   * 如果我们的某个问卷用了多个使用了这个第三方包的题目,则会重复加载这个包的内容,
   * 这时候我们可以在这里设置,针对某个包我们指明单独打包出去.避免上述的情况.
   */
  splitChunks: [
    {
      name: 'pinyin',
      folder: 'node_modules/pinyin'
    }, {
      name: 'qrcodejs2',
      folder: 'node_modules/qrcodejs2'
    }
  ]
};