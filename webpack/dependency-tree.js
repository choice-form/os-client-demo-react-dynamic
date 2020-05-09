const { isStandardPluginFile, getSplitChunkName,
  isUsefulPluginFile, getModulePortrait,
  testBadDependency } = require('./common');
const depcruise = require("dependency-cruiser").cruise;

/**
 * 确保依赖树遵循了我们自定义的依赖规则
 * @param {*} dependencies 
 */
function checkDependencyRules() {
  // 我们只抓插件部分的依赖树
  let dependencies = depcruise(["src"], {
    exclude: "node_modules",
  }).output;
  const errors = [];
  dependencies.modules.forEach(md => {
    const selfPortrait = getModulePortrait(md.source);
    md.dependencies.forEach(dep => {
      const depPortrait = getModulePortrait(dep.resolved);
      const bad = testBadDependency(selfPortrait, depPortrait);
      if (bad) {
        errors.push(errors.length + ". " + bad);
      }
    });
  });
  if (errors.length > 0) {
    return '\n\n\n检测到坏依赖,你应该修复好这些问题,否则发布时构建会出错:\n'
      + errors.join('\n') + '\n\n\n';
  }
  return undefined;
}


/**
 * 获取到依赖树,先通过第三方插件获取依赖树,然后结合webpack的chunkMap
 * 把依赖树和目标chunk文件关联起来
 * @param {{[key:string]:string}} chunkMap webpack的chunkMap,
 * 其中存储了chunk名目标文件映射
 */
function getDependencyTree(chunkMap) {
  // 我们只抓插件部分的依赖树
  let dependencies = depcruise(["src/plugin"]).output;
  const tree = {
    partials: [],
    standards: []
  };
  dependencies.modules.forEach(md => {
    const filePath = md.source;
    // 只要ts模块
    if (filePath.match(/\.tsx?$/)) {
      const id = getSplitChunkName(filePath);
      const dependencies = md.dependencies.map(d => d.resolved)
        .filter(d => isUsefulPluginFile(d))
        .map(d => getSplitChunkName(d));
      // 从chunkMap中获取到目标文件
      const file = chunkMap[id];
      // 通用树叶
      const item = { id, file, dependencies };
      // 标准入口组件
      if (isStandardPluginFile(filePath)) {
        const name = filePath.match(/[\\/]([^\\/]+)[\\/]index\.tsx/)[1];
        const type = filePath.match(/[\\/]([^\\/]+)[\\/][^\\/]+[\\/]index\.tsx/)[1];
        tree.standards.push({ ...item, type, name });
      } else {
        tree.partials.push({ ...item });
      }
    }
  });
  return tree;
}

module.exports = {
  getDependencyTree,
  checkDependencyRules,
};