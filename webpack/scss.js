const recursive = require('recursive-readdir');
const fs = require('fs');

/**
 * 运行该方法可以自动帮主程序生成scss文件的依赖树,全部加入到app.scss中
 */
function generateScssTree() {
  recursive('src/app', [], function (err, files) {
    let content = '';
    files.sort((a, b) => a > b ? 1 : -1)
      .forEach(file => {
        file = file.replace(/\\/g, '/');
        if (file !== 'src/app/app.scss'
          && file.endsWith('.scss')) {
          content += `@import '${file.replace('src/app/', './')}';` + '\n';
        }
      });
    fs.writeFileSync('src/app/app.scss', content);
  });
}

module.exports = {
  generateScssTree
};


