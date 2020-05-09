/**
 * 用于匹配标准入口插件路径规则的正则表达式
 */
const standardMatchReg = /src[\\/]plugin[\\/]standards[\\/]/;
/**
 * 用于匹配零散插件路径规则的正则表达式
 */
const partialMatchReg = /src[\\/]plugin[\\/]partials[\\/]/;
/**
 * 从项目根目录到插件仓库的路径片段表达式
 */
const pluginPrefixMatchReg = /(?:.+[\\/])?src[\\/]plugin[\\/]/;
/**
 * 从项目根目录到插件仓库的路径
 */
const pluginRoot = './src/plugin/';
/**
 * 标准入口插件文件夹名
 */
const standardFolderName = 'standards';
/**
 * 标准入口插件文件夹路径
 */
const standardPath = pluginRoot + standardFolderName;
/**
 * 零散插件文件夹名
 */
const partialFolderName = 'partials';
/**
 * 零散插件文件夹路径
 */
const partialPath = pluginRoot + partialFolderName;


/**
 * 是否为标准的插件路径
 * @param p 
 */
function isStandardPluginFile(p) {
  return !!p.match(standardMatchReg);
}

/**
 * 是否为有效的插件文件
 * @param {string} file 
 */
function isUsefulPluginFile(file) {
  // 来自标准入口插件
  if (isStandardPluginFile(file)) {
    // 只要index.tsx的
    return file.endsWith('index.tsx');
    // 来自非标准入口的
  } else {
    // 满足ts模块即可
    return !!file.match(/\.tsx?$/);
  }
}
/**
 * 根据文件名得到要生成的chunk名
 * @param {string} file 
 */
function getChunkName(file) {
  let result = '';
  // 标准入口插件,把index后缀去掉
  if (isStandardPluginFile(file)) {
    result = file.replace(/[\\/]index?\.tsx$/, '');
    // 零散插件,则如果是index.tsx文件名,则去掉
    // 否则只去掉后缀名
  } else {
    // 其他插件可能是任何名成的ts模块
    // 如果是以index.tsx结尾的,则去掉index.tsx
    // 否则只去掉后缀
    // 找到所在文件夹
    // 先去掉index.tsx结尾,如果不是这种格式的则这一步什么都没干
    // 下一步可以在去掉后缀
    result = file.replace(/[\\/]index?\.tsx$/, '')
      .replace(/\.tsx?$/, '');
  }
  // 在进行常规处理
  return result.replace(pluginPrefixMatchReg, '')
    .replace(/[\\/]/g, '_');
}

module.exports = {
  standardMatchReg,
  partialMatchReg,
  isUsefulPluginFile,
  pluginRoot,
  standardFolderName,
  standardPath,
  partialPath,
  partialFolderName,
  pluginPrefixMatchReg,
  getChunkName,
  isStandardPluginFile
};