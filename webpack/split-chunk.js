const fs = require('fs');
const {
  isUsefulPluginFile, partialPath,
  standardPath, getChunkName
} = require('./common');



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
    // 标准插件都是index.tsx结尾的
    // 找到所在文件夹
    const folder = file.replace(/[\\/]index?\.tsx$/, '');
    // 去除前缀并替换文件夹分隔符
    const entryName = getChunkName(folder);
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
    // 其他插件可能是任何名成的ts模块
    // 如果是以index.tsx结尾的,则去掉index.tsx
    // 否则只去掉后缀
    // 找到所在文件夹
    // 先去掉index.tsx结尾,如果不是这种格式的则这一步什么都没干
    // 下一步可以在去掉后缀
    const folder = file.replace(/[\\/]index?\.tsx$/, '')
      .replace(/\.tsx?$/, '');
    const chunkName = getChunkName(folder);
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
  return splitChunks;
}

module.exports = {
  getStandardEntries,
  getSplitChunks
};