const hasha = require('hasha');
const hashCache = {};
exports.getHash = function (code, content) {
  if (!hashCache[code]) {
    hashCache[code] = hasha(content).substr(0, 8);
  }
  return hashCache[code];
};

exports.parseLangObj = function(text) {
  const startIndex = text.indexOf('{');
  const endIndex = text.lastIndexOf('}') + 1;
  const replaced = 'return ' + text.substring(startIndex, endIndex);
  return (new Function(replaced))();
};