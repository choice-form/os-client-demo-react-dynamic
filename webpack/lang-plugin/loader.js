
const loaderUtils = require("loader-utils");
const { getHash } = require('./hash');
module.exports = function (source) {
  const fromFile = this.resourcePath;
  // 多语言文件,导出文件路径
  if (fromFile.match(/lang[\\/]\w+\.ts/)) {
    const { local, prefix } = loaderUtils.getOptions(this);
    const start = fromFile.lastIndexOf('/') + 1
      || fromFile.lastIndexOf('\\') + 1;
    const end = fromFile.lastIndexOf('.');
    const code = fromFile.substring(start, end);
    const hash = local
      ? '' : '-' + getHash(code, source);
    const parsed = `export default "${prefix}/${code}${hash}.json?${Date.now()}"`;
    return parsed;
    // 其他文件,替换里面的多语言代号
  } else {
    const parsed = source.replace(/LANG((?:\.\w+)+)/g, (_match, first) => {
      return `'${first.substr(1)}'`;
    });
    return parsed;
  }
};
