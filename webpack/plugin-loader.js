
const nameMatchReg = /[\\/]plugin[\\/]standards[\\/](.+)[\\/]index.tsx$/;

module.exports = function (source) {
  const match = this.resourcePath.match(nameMatchReg);
  if (!match) {
    return source;
  }
  const name = match[1].replace(/[\\/]/g, '_');
  const parsed = source.replace(/export\s+default/,
    `export default (window as any).CF_UI_PLUGIN["${name}"] =`);
  console.log(parsed);
  return parsed;
};