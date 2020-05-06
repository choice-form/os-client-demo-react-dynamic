const { getOptions } = require('loader-utils');
module.exports = function (source) {
  const reg = /<link\s+href=['"](.+?\.html)['"]\/?>/g;
  const parsed = source.toString().replace(reg, function (match, first) {
    return '${require("' + first + '")}';
  }).replace('<dev-support />', getOptions(this).devSupport);
  return parsed;
};