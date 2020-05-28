const fs = require('fs');
const { getHash, parseLangObj } = require('./hash');
const { getCdnFolder } = require('../dev');
class LangPlugin {
  constructor(options) {
    this.options = options || {};
  }
  apply(compiler) {
    let { options: { local, directory } } = this;
    compiler.hooks.emit.tap('LangPlugin', function (compilation) {
      const files = fs.readdirSync(directory);
      files.forEach(file => {
        if (file.startsWith('.')) {
          return;
        }
        const langCode = file.substr(0, file.lastIndexOf('.'));
        let content = '';
        const origin = fs.readFileSync(`${directory}/${file}`).toString();
        const hash = local
          ? '' : '-' + getHash(langCode, origin);
        try {
          content = parseLangObj(origin);
        } catch (e) {
          if (local) {
            // 本地环境不要被多语言的错误中断hot-server
            // 只是打出错误
            console.info(e);
          } else {
            // 发布环境要抛出错误
            throw e;
          }
        }
        // 生成json
        const text = JSON.stringify(content);
        const fileName = `${getCdnFolder()}${langCode}${hash}.json`;
        compilation.assets[fileName] = {
          source: function () {
            return text;
          },
          size: function () {
            return text.length;
          }
        };
      });
    });
  }
}

LangPlugin.loader = require.resolve('./loader');

module.exports = LangPlugin;
