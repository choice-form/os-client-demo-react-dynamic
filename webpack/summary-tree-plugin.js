const fs = require('fs');

const map = [];

function objectize(obj, round = 0) {
  if (round > 5) {
    return 'end-max-round';
  }
  const newObj = {};
  const cache = map.find(item => {
    item.origin === obj;
  });
  if (cache) {
    return cache.result;
  }
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    if (value && typeof value === 'object') {
      newObj[key] = objectize(value, round + 1);
    } else {
      newObj[key] = value;
    }
  });
  map.push({ origin: obj, result: newObj });
  return newObj;
}

class SummaryTreePlugin {

  apply(compiler) {
    // Specify the event hook to attach to
    compiler.hooks.emit.tapAsync(
      'SummaryTreePlugin',
      (compilation, callback) => {
        const chunksInfo = [];
        compilation.chunks.forEach(chunk => {
          const modules = chunk.getModules();
          const chunkInfo = {
            name: chunk.name,
            files: chunk.files,
            modules: modules.reduce((rs, md) => {
              if (md.context && md.context.match(/[\\/]plugin[\\/]partials[\\/].+/)) {
                rs.push({
                  self: md.context,
                  requestedBy: md.issuer && md.issuer.context,
                });
              }
              return rs;
            }, [])
          };
          chunksInfo.push(chunkInfo);
        });
        // console.log(objectize(chunksInfo));
        fs.writeFileSync('./log/tree.json',
          JSON.stringify(chunksInfo, null, ' '));
        callback();
      }
    );
  }
}
module.exports = SummaryTreePlugin;