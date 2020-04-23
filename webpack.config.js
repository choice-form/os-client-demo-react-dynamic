const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const {
  isLocal, getConfigFile, getCoreSdkAlias, getDevPlugin
} = require('./webpack/dev');
const { getPluginEntries } = require('./webpack/plugin');
const pluginEntries = getPluginEntries();

module.exports = (env) => {
  return {
    entry: {
      cluster: './plugin/cluster.ts',
      ...pluginEntries,
      index: './app/index.tsx',
    },
    output: {
      filename: isLocal(env) ? '[name].js' : '[name]-[contenthash:8].js',
      path: path.resolve('./dist'),
      pathinfo: false,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './app/index.html',
        filename: 'index.html',
        favicon: path.resolve('./app/favicon.ico'),
        // excludeChunks: Object.keys(pluginEntries)
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
        cacheGroups: {
          react: {
            chunks: 'all',
            name: 'react',
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          },
          core: {
            chunks: 'all',
            name: 'core',
            test: /[\\/]os-client-core[\\/]/,
          }
        }
      }
    }
  };
};