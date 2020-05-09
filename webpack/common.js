const path = require('path');
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
 * 主程序路径匹配正则
 */
const appMatchReg = /src[\\/]app[\\/]/;
/**
 * 工具程序路径匹配规则
 */
const utilsMatchReg = /src[\\/]utils[\\/]/;
/**
 * 插件程序路径匹配规则
 */
const pluginMatchReg = /src[\\/]plugin[\\/]/;
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
 * @param file  文件名
 */
function isStandardPluginFile(file) {
  return !!file.match(standardMatchReg);
}

/**
 * 是否为有效的插件文件
 * @param {string} file 文件名
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
 * @param {string} file 文件名
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

/**
 * 获取模块的基本性质
 * @param {*} file 文件名
 */
function getModulePortrait(file) {
  const portrait = { file: path.resolve(file) };
  if (file.match(appMatchReg)) {
    portrait.isApp = true;
  } else if (file.match(utilsMatchReg)) {
    portrait.isUtils = true;
  } else if (file.match(pluginMatchReg)) {
    portrait.isPlugins = true;
    if (file.match(standardMatchReg)) {
      portrait.isStandards = true;
    } else {
      portrait.isPartials = true;
    }
  }
  return portrait;
}
/**
 * 是否为坏的的依赖关系
 * @param {*} main 主模块
 * @param {*} dependency 依赖模块
 */
function testBadDependency(main, dependency) {
  if (main.isApp && dependency.isPlugins) {
    return '主程序src/app中的模块不能引用插件程序src/plugin中的模块\n但是:\n'
      + main.file + '\n 引用了 \n' + dependency.file;
  }

  if (main.isPlugins && dependency.isApp) {
    return '插件程序src/plugin中的模块不能引用主程序src/app中的模块\n但是:\n'
      + main.file + '\n 引用了 \n' + dependency.file;
  }

  if (main.isUtils && dependency.isApp) {
    return '工具程序src/utils中的模块不能引用主程序src/app中的模块\n但是:\n'
      + main.file + '\n 引用了 \n' + dependency.file;
  }

  if (main.isUtils && dependency.isPlugins) {
    return '工具程序src/utils中的模块不能引用主程序src/plugin中的模块\n但是:\n'
      + main.file + '\n 引用了 \n' + dependency.file;
  }

  if (main.isPartials && dependency.isStandards) {
    return '工具程序src/plugin/partials中的模块不能引用主程序src/plugin/standards中的模块\n'
      + main.file + '\n 引用了 \n' + dependency.file;
  }
  return '';
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
  isStandardPluginFile,
  getModulePortrait,
  testBadDependency
};