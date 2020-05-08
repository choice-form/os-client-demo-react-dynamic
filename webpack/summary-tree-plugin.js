const fs = require('fs');
const { standardMatchReg, partialMatchReg } = require('./common');
const depcruise = require("dependency-cruiser").cruise;

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
 * 尝试将项目加到树中,如果树中已经有同id的项目
 * 则不加入而是合并依赖项,这样才能防止生成同样的树
 * @param {*} list 
 * @param {*} item 
 */
function addToTree(list, item) {
  const old = list.find(temp => {
    return temp.id === item.id;
  });
  if (old) {
    item.dependencies.forEach(did => {
      if (!old.dependencies.includes(did)) {
        old.dependencies.push(did);
      }
    });
  } else {
    list.push(item);
  }
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
        tid: md.id,
        dependencies,
        // chunk,
        // md,
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
        // 自身引用的不要
      }).filter(id => id !== raw.id)
    };
    if (raw.standard) {
      reformed.type = raw.self.match(/[\\/]plugin[\\/]standards[\\/](.+?)[\\/]/)[1];
      reformed.name = raw.id.substr(raw.id.lastIndexOf('_') + 1)
        .replace(/[-_]/g, ' ');
      addToTree(config.standards, reformed);
    } else {
      if (reformed.id === 'standards_icon_basic') {
        console.log(reformed, raw);
      }
      addToTree(config.partials, reformed);
    }
  });
  fs.writeFileSync('./dist/tree.json', JSON.stringify(config));
}

function generatePluginTree2(compilation) {
  // 通过chunks生成chunk名目标文件的映射关系,后面需要用到.
  const chunkMap = {};
  compilation.chunks.forEach(chunk => {
    chunkMap[chunk.name] = chunk.files[0];
  });
  // 接下来我们来查找依赖关系
  // 之前我们使用了webpack自身的chunks树来获取依赖关系
  // 但是都是自己调试得到的接口,这些结构在文档中无说明,而且非常之复杂.
  // 考虑到后续webpack可能发生变更,导致这些结构无法被使用,
  // 或者对于复杂的依赖关系出现问题时,难以调试错误.
  // 现在决定使用简单的第三方库来获取依赖树关系
  // 然后再结合前面从webpack中抽出的chunk和目标文件的映射来在树中添加目标文件
  // 而从webpack中抽出chunk映射不需要深入钻取webpack的内部结构,很简单
  // 第三方的库则易于调试.方便.


  // 我们只抓插件部分的依赖树
  let dependencies = depcruise(["src/plugin"]).output;

  const modules = dependencies.modules.filter(md => {
    md.dependencies = md.dependencies.map(d => d.resolved)
      .filter(d => {
        // 来自标准入口插件
        if (d.match(standardMatchReg)) {
          // 只要index.tsx的
          return d.endsWith('.index.tsx');
          // 来自非标准入口的
        } else {
          // 满足ts模块即可
          return d.match(/.tsx?/);
        }
      });
    return md.source.match(/\.tsx?/);
  });

  console.log(modules);
}


class SummaryTreePlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      'SummaryTreePlugin',
      (compilation, callback) => {
        generatePluginTree(compilation);
        generatePluginTree2(compilation);
        callback();
      }
    );
  }
}
module.exports = SummaryTreePlugin;