
const { getSplitChunkName, isUsefulPluginFile } = require('./common');
// const nameMatchReg = /[\\/]src[\\/]plugin[\\/]((?:standards|partials)[\\/].+)[\\/]index\.tsx$/;

/**
 * 标准入口插件的加载器
 * 标准入口的组件不会被任何主程序的模块应用,而是单独构建的,
 * 为了后续动态加载进来以后,主程序能访问到这些组件,我们构建的时候
 * 添加一下代码将组件粘附到双方协定好的一个全局属性上.
 */
module.exports = function (source) {
  const file = this.resourcePath;
  if (!isUsefulPluginFile(file)) {
    return source;
  }
  const name = getSplitChunkName(this.resourcePath);
  // 偷偷在插件的默认导出中注入粘附到全局的代码
  const parsed = source.replace(/export\s+default/,
    `export default (window as any).CF_UI_COMS["${name}"] =`);
  return parsed;
};