// 用于匹配插件路径规则的正则表达式
const standardMatchReg = /[\\/]src[\\/]plugin[\\/]standards[\\/]/;
const partialMatchReg = /[\\/]src[\\/]plugin[\\/]partials[\\/]/;
const pluginPrefixMatchReg = /.+[\\/]src[\\/]plugin[\\/]/;
const pluginRoot = './src/plugin/';
const standardFolderName = 'standards';
const standardPath = pluginRoot + standardFolderName;
const partialFolderName = 'partials';
const partialPath = pluginRoot + partialFolderName;

/**
 * 是否为有效的插件文件
 * @param {string} file 
 */
function isUsefulPluginFile(file) {
  // 来自标准入口插件
  if (file.match(standardMatchReg)) {
    // 只要index.tsx的
    return file.endsWith('index.tsx');
    // 来自非标准入口的
  } else {
    // 满足ts模块即可
    return !!file.match(/\.tsx?$/);
  }
}
/**
 * 根据文件夹名得到要生成的chunk名
 * @param {string} folder 
 */
function getChunkName(folder) {
  return folder.replace(pluginPrefixMatchReg, '')
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
  getChunkName
};