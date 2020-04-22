const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');

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

module.exports = (env) => {
  return {
    entry: './app/index.tsx',
    output: {
      filename: isLocal(env) ? '[name].js' : '[name]-[contenthash:8].js',
      path: path.resolve('./dist'),
      pathinfo: false,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './app/index.html',
        filename: 'index.html',
        favicon: path.resolve('./public/favicon.ico')
      }),
      new CleanWebpackPlugin(),
      ...getDevPlugin(env),
    ],
    module: {
      rules: [{
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
        }
      }]
    },
    devServer: isLocal(env) ? {
      historyApiFallback: true,
      contentBase: path.resolve(__dirname, 'dist'),
      headers: { "Access-Control-Allow-Origin": "*" },
      host: '0.0.0.0',
      port: 7076,
      hot: true,
    } : undefined,
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        config: path.join(__dirname, `config/${getConfigFile(env)}.ts`),
        ...getCoreSdkAlias(env)
      },
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      }
    }
  };
};