const fs = require('fs');
const {
  isUsefulPluginFile, partialPath,
  standardPath, getSplitChunkName
} = require('./common');
const buildConfig = require('../build.config');

/**
 * 获取要独立分割构建的插件文件列表
 * @param {string} directory 所在目录
 * @returns {string[]}
 */
function getSplitFiles(directory) {
  let result = [];
  const fileNameList = fs.readdirSync(directory);
  fileNameList.forEach(fileName => {
    const filePath = directory + '/' + fileName;
    if (isUsefulPluginFile(filePath)) {
      result.push(filePath);
    } else if (fs.statSync(filePath).isDirectory()) {
      result = [...result, ...getSplitFiles(filePath)];
    }
  });
  return result;
}

/**
 * 获取标准入口插件的构建入口
 * 因为标准入口插件在代码编写时语法上是不会被任何模块依赖的
 * 我们需要单独为其生成构建入口,才能使他们被构建出来
 */
function getStandardEntries() {
  // 标准入口插件文件列表
  const standardFiles = getSplitFiles(standardPath);
  const entries = {};
  standardFiles.forEach(file => {
    // 获取名称
    const entryName = getSplitChunkName(file);
    entries[entryName] = file;
  });
  return entries;
}

/**
 * 对于非标准入口的模块,我们全部设为独立分块构建
 */
function getSplitChunks() {
  // 其他插件的文件列表
  const partialFiles = getSplitFiles(partialPath);
  // 其他插件都需要配置分离构建
  const splitChunks = {};
  partialFiles.forEach(file => {
    // 获取名称
    const chunkName = getSplitChunkName(file);
    splitChunks[chunkName] = {
      chunks: 'all',
      name: chunkName,
      enforce: true,
      test(module) {
        // 去掉前缀
        const matchFile = file.replace(/^\./, '')
          .replace(/\\/g, '/');
        // 资源是本文件则分离构建
        return module.resource &&
          module.resource.replace(/\\/g, '/')
            .includes(matchFile);

      }
    };
  });
  // 配置中的也读过来
  buildConfig.splitChunks.forEach(item => {
    splitChunks[item.name] = {
      chunks: 'all',
      name: item.name,
      enforce: true,
      test(e) {
        return e.resource && e.resource.match(item.testRegExp);
      }
    };
  });
  return splitChunks;
}

module.exports = {
  getStandardEntries,
  getSplitChunks
};