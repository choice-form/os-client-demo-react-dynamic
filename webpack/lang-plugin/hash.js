const hasha = require('hasha');
const hashCache = {};
exports.getHash = function (code, content) {
  if (!hashCache[code]) {
    hashCache[code] = hasha(content).substr(0, 8);
  }
  return hashCache[code];
};
