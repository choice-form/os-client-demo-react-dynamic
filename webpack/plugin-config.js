const fs = require('fs');

const pluginRoot = './plugin/';
const standardFolder = 'standards';
const standardPath = pluginRoot + standardFolder;
const partialFolder = 'partials';
const partialPath = pluginRoot + partialFolder;

function getFiles(directory, prefix = '') {
  let result = [];
  const files = fs.readdirSync(directory);
  files.forEach(file => {
    const currentPath = directory + '/' + file;
    const currentPrefix = prefix ? prefix + '/' + file : file;
    if (file.endsWith('index.tsx')) {
      result.push(currentPrefix);
    } else if (fs.statSync(currentPath).isDirectory()) {
      result = [...result, ...getFiles(currentPath, currentPrefix)];
    }
  });
  return result;
}
function getPluginConfig() {
  const pluginsFiles = getFiles(standardPath, standardFolder);
  const componentFiles = getFiles(partialPath, partialFolder);
  const entries = {};
  const splitChunks = {};
  [...pluginsFiles, ...componentFiles].forEach(file => {
    const pPath = file.replace(/(?:[\\/]index)?\.tsx$/, '');
    const name = pPath.replace(/[\\/]/g, '_');
    if (file.startsWith(partialFolder)) {
      splitChunks[name] = {
        chunks: 'all',
        name,
        enforce: true,
        test(module) {
          return module.resource &&
            module.resource.replace(/\\/g, '/')
              .includes(file.replace(/\\/g, '/'));

        }
      };
    } else {
      entries[name] = pluginRoot + file;
    }
  });
  return { entries, splitChunks };
}

module.exports = {
  getPluginConfig,
};