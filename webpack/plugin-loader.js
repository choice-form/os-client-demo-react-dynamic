
const nameMatchReg = /[\\/]plugin[\\/](standards[\\/].+)[\\/]index.tsx$/;

module.exports = function (source) {
  const match = this.resourcePath.match(nameMatchReg);
  if (!match) {
    return source;
  }
  // 偷偷在插件的默认导出中注入粘附到全局的代码
  const name = match[1].replace(/[\\/]/g, '_');
  const parsed = source.replace(/export\s+default/,
    `export default window.CF_UI_COMS["${name}"] =`);
  return parsed;
};