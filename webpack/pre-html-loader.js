const { getOptions } = require('loader-utils');

/**
 * HTML文件预加载器
 * 做两件事
 * 1. 把link标签方式的html片段包含,改成html-loader支持的require方式包含.
 * 2. 处理dev-support标签,如果是本地开发时,加上本地开发需要的额外脚本.
 */
module.exports = function (source) {
  const reg = /<link\s+href=['"](.+?\.html)['"]\/?>/g;
  const parsed = source.toString().replace(reg, function (match, first) {
    return '${require("' + first + '")}';
  }).replace('<dev-support />', getOptions(this).devSupport);
  return parsed;
};