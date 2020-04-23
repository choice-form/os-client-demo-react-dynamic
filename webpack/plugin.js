const fs = require('fs');

const pluginRoot = './plugin/';
const standardFolder = 'standards';
const standardPath = pluginRoot + standardFolder;
const componentFolder = 'components';
const componentPath = pluginRoot + componentFolder;

function getFiles(directory, prefix = '') {
  let result = [];
  const files = fs.readdirSync(directory);
  files.forEach(file => {
    const currentPath = directory + '/' + file;
    const currentPrefix = prefix ? prefix + '/' + file : file;
    if (file.endsWith('.tsx')) {
      result.push(currentPrefix);
    } else if (fs.statSync(currentPath).isDirectory()) {
      result = [...result, ...getFiles(currentPath, currentPrefix)];
    }
  });
  return result;
}

function getPluginEntries() {
  const pluginsFiles = getFiles(standardPath, standardFolder);
  const componentFiles = getFiles(componentPath, componentFolder);
  const entries = {};
  [...pluginsFiles, ...componentFiles].forEach(file => {
    const name = file.replace(/[\\/]/g, '_').replace(/(?:_index)?\.tsx$/, '');
    entries[name] = pluginRoot + file;
  });
  return entries;
}

module.exports = {
  getPluginEntries,
};