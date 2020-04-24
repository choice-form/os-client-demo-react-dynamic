const fs = require('fs');
// 用于匹配插件路径规则的正则表达式
const standardMatchReg = /[\\/]plugin[\\/]standards[\\/]/;
const partialMatchReg = /[\\/]plugin[\\/]partials[\\/]/;

/**
 * 是否为标准的插件路径
 * @param p 
 */
function isStandard(p) {
  return !!p.match(standardMatchReg);
}

/**
 * 是否为有效的插件路径
 * @param p 
 */
function isPluginPath(p) {
  return !!(p && (p.match(standardMatchReg) || p.match(partialMatchReg)));
}

/**
 * 生成组件依赖树
 * @param compilation 
 */
function generatePluginTree(compilation) {
  const rawList = [];
  // 找到所有的编译组块
  compilation.chunks.forEach(chunk => {
    // 某个组块中所有的模块
    const modules = chunk.getModules();
    modules.forEach(md => {
      // 某个模块
      // 模块的上下文路径不存在或不匹配插件路径规则的丢弃
      if (!isPluginPath(md.context)) {
        return;
      }
      // 获取该模块对其他模块的依赖关系
      // 我们只保留其中满足插件规则的依赖
      const dependencies = md.dependencies
        .map(d => d.module && d.module.context)
        .filter(t => isPluginPath(t));
      // 整理出来的原始数据
      const raw = {
        standard: isStandard(md.context),
        id: chunk.name,
        file: chunk.files[0],
        self: md.context,
        dependencies
      };
      rawList.push(raw);
    });
  });
  // 接下来做成配置文件
  const config = {
    standards: [],
    partials: [],
  };
  rawList.forEach(raw => {
    const reformed = {
      id: raw.id,
      file: raw.file,
      dependencies: raw.dependencies.map(dp => {
        const item = rawList.find(temp => temp.self === dp);
        return item.id;
      })
    };
    if (raw.standard) {
      reformed.name = raw.id.substr(raw.id.lastIndexOf('_') + 1)
        .replace(/[-_]/g, ' ');
      config.standards.push(reformed);
    } else {
      config.partials.push(reformed);
    }
  });
  fs.writeFileSync('./dist/tree.json', JSON.stringify(config, null, ' '));
}


class SummaryTreePlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      'SummaryTreePlugin',
      (compilation, callback) => {
        generatePluginTree(compilation);
        callback();
      }
    );
  }
}
module.exports = SummaryTreePlugin;