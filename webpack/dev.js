const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');
const path = require('path');
const config = require('../build.config');

/**
 * 是否为本地开发
 * @param {*} env 
 */
function isLocal(env) {
  return env.NODE_ENV === 'local';
}

/**
 * 获取线上的配置
 * @param {*} env 
 */
function getConfigFile(env) {
  return env.NODE_ENV === 'prod' ? 'prod' : 'staging';
}
/**
 * 获取本地开发核心包地址
 * @param {*} env 
 */
function getDevCoreSdkPath(env) {
  const debugSdkPath = path.resolve(
    '../os-client-core/debug/umd-legacy.js');
  if (isLocal(env) && fs.existsSync(debugSdkPath)) {
    return debugSdkPath;
  }
  return undefined;
}

/**
 * 获取本地开发核心包别名
 * @param {*} env 
 */
function getCoreSdkAlias(env) {
  const debugSdkPath = getDevCoreSdkPath(env);
  // 本地开发模式且能找到开发版sdk
  if (debugSdkPath) {
    // 配置别名
    // 开发模式下我们不会真正导入该包,该包会直接插入到html中,
    // 我们偷偷的导入一个共调试使用的转接包
    const dest = debugSdkPath
      .replace(/[\\/][^\\/]+$/, '/core-update.js');
    return {
      '@choiceform/os-client-core': dest,
    };
  }
  return {};
}

/**
 * 开发模式下直接把核心包相关资源拷贝过来
 * 因为开发模式下回禁止自动导入开发包,这样会破坏sourcemap,所以是直接插入到html中的
 * 而自动导入的是一个起转接作用的假包
 * @param {*} env 
 */
function getDevPlugin(env) {
  const debugSdkPath = getDevCoreSdkPath(env);
  if (debugSdkPath) {
    // 拷贝多语言文件到debug目录下,因为开发模式下会读取这下面的
    const list = ['zh_cn', 'en_us'].map(name => {
      const fileName = name + '-00000000.json';
      return {
        from: debugSdkPath.replace(/[\\/][^\\/]+$/, '/' + fileName),
        to: path.resolve(`./dist/${getCdnFolder()}debug/` + fileName)
      };
    });
    // 把核心包和sourcemap拷贝到assets目录下,以供直接引入
    const sdkFileName = debugSdkPath.match(/[\\/]([^\\/]+)$/)[1];
    list.push({
      from: debugSdkPath + '.map',
      to: path.resolve(`./dist/${getCdnFolder()}` + sdkFileName + '.map')
    });
    list.push({
      from: debugSdkPath,
      to: path.resolve(`./dist/${getCdnFolder()}` + sdkFileName)
    });
    return [
      new CopyWebpackPlugin(list),
    ];
  }
  return [];
}

/**
 * 确保dist目录存在
 */
function insureDistDir() {
  try {
    fs.mkdirSync('dist');
  } catch (e) {
    // do nothing;
  }
}
/**
 * 获取cdn资源路径
 * @param {*} env 
 */
function getAssetsPath(env) {
  let result = config.assetsPath[env.NODE_ENV];
  if (env.NODE_ENV === 'local') {
    result = result.replace('${port}', config.devPort);
  }
  if (config.cdnFolder) {
    result += "/" + config.cdnFolder;
  }
  return result;
}
/**
 * 获取本地开发启动端口
 */
function getDevPort() {
  return config.devPort;
}
/**
 * 获取cdn资源文件夹
 */
function getCdnFolder() {
  if (config.cdnFolder) {
    return config.cdnFolder + '/';
  }
  return '';
}

module.exports = {
  isLocal,
  getConfigFile,
  getCoreSdkAlias,
  getDevPlugin,
  insureDistDir,
  getAssetsPath,
  getCdnFolder,
  getDevPort,
};