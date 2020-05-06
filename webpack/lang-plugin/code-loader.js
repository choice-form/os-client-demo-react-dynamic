module.exports = function (source) {
  const parsed = source.replace(/LANG((?:\.\w+)+)/g, (_match, first) => {
    return `'${first.substr(1)}'`;
  });
  return parsed;
};
