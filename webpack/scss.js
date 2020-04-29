const recursive = require('recursive-readdir');
const fs = require('fs');

function generateScssTree() {
  recursive('app', [], function (err, files) {
    let content = '';
    files.sort((a, b) => a > b ? 1 : -1)
      .forEach(file => {
        file = file.replace(/\\/g, '/');
        if (file !== 'app/app.scss'
          && file.endsWith('.scss')) {
          content += `@import '${file.replace('src/', './')}';` + '\n';
        }
      });
    fs.writeFileSync('app/app.scss', content);
  });
}

module.exports = {
  generateScssTree
};


