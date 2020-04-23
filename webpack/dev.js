const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');
const path = require('path');
function isLocal(env) {
  return env.NODE_ENV === 'local';
}
function getConfigFile(env) {
  return env.NODE_ENV === 'prod' ? 'prod' : 'staging';
}

function getDevCoreSdkPath(env) {
  const debugSdkPath = path.resolve(
    '../os-client-core/debug/umd-legacy-with-i18n.js');
  if (isLocal(env) && fs.existsSync(debugSdkPath)) {
    return debugSdkPath;
  }
  return undefined;
}

function getCoreSdkAlias(env) {
  const debugSdkPath = getDevCoreSdkPath(env);
  // 本地开发模式且能找到开发版sdk
  if (debugSdkPath) {
    // 配置别名
    return {
      '@choiceform/os-client-core': debugSdkPath,
    };
  }
  return {};
}

function getDevPlugin(env) {
  const debugSdkPath = getDevCoreSdkPath(env);
  if (debugSdkPath) {
    const list = ['zh_cn', 'en_us'].map(name => {
      const fileName = name + '-00000000.json';
      return {
        from: debugSdkPath.replace(/\/[^/]+$/, '/' + fileName),
        to: path.resolve('./dist/assets/debug/' + fileName)
      };
    });
    return [
      new CopyWebpackPlugin(list),
    ];
  }
  return [];
}

module.exports = {
  isLocal,
  getConfigFile,
  getCoreSdkAlias,
  getDevPlugin
};