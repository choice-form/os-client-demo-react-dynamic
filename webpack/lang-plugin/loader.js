
const loaderUtils = require("loader-utils");
const { getHash, parseLangObj } = require('./hash');
const fs = require('fs');
const dir = 'lang';
const replaceStartLabel = '// __i18n-custom-build-replace-start__';
const replaceEndLabel = '// __i18n-custom-build-replace-end__';
module.exports = function (source) {
  const isJs = source.includes('exports.');
  let exportsExp = isJs ? 'exports.' : 'export const ';
  let defineExp = isJs ? 'var ' : 'const ';
  const files = fs.readdirSync(dir);
  let parsed = '';
  // 配置参数
  const { local, prefix } = loaderUtils.getOptions(this);
  // 每个语言文件导出一个资源连接地址
  files.forEach(file => {
    const filePath = dir + '/' + file;
    const code = file.replace('.ts', '');
    const source = fs.readFileSync(filePath).toString();
    const hash = local
      ? '' : '-' + getHash(code, source);
    parsed += `${defineExp}${code} = '${prefix}/${code}${hash}.json';\n`;
  });
  // 以中文的字符集为基准生成整整的字符集
  let langCodes = fs.readFileSync('lang/zh_cn.ts').toString();
  const codeObj = parseLangObj(langCodes);
  replaceLangCode(codeObj);

  parsed += `${exportsExp}LANG = ${JSON.stringify(codeObj, null, ' ')};\n`;
  const replaceStartIndex = source.indexOf(replaceStartLabel);
  let replaceEndIndex = source.indexOf(replaceEndLabel);
  if (replaceStartIndex === -1 || replaceEndIndex === -1) {
    throw new Error('lang replace label lost');
  }
  replaceEndIndex += replaceEndLabel.length + 1;
  const head = source.substring(0, replaceStartIndex);
  const tail = source.substring(replaceEndIndex);
  const result = head + parsed + tail;
  return result;
};

function replaceLangCode(obj, prefix) {
  const keys = Object.keys(obj);
  for (const key of keys) {
    const accumulation = prefix ? prefix + '.' + key : key;
    const value = obj[key];
    if (typeof value === 'string') {
      obj[key] = accumulation;
    } else {
      replaceLangCode(value, accumulation);
    }
  }
}