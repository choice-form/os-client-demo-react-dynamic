const fs = require('fs');
const { getDependencyTree, checkDependencyRules } = require('./dependency-tree');


function generatePluginTree(compilation) {
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

  // 获取到依赖树
  const tree = getDependencyTree(chunkMap);
  fs.writeFileSync('./dist/tree.json', JSON.stringify(tree));
}

/**
 * 生成动态加载模块依赖树的webpack插件
 */
class SummaryTreePlugin {
  constructor(options) {
    this.options = options || {};
  }
  apply(compiler) {
    const { options: { local } } = this;
    compiler.hooks.emit.tapAsync(
      'SummaryTreePlugin',
      (compilation, callback) => {

        generatePluginTree(compilation);
        callback();
      }
    );
    compiler.hooks.compile.tap(
      'SummaryTreePlugin',
      () => {
        const error = checkDependencyRules();
        if (error) {
          if (local) {
            console.log('\x1b[31m', error);
          } else {
            throw error;
          }

        }
      }
    );
  }
}
module.exports = SummaryTreePlugin;