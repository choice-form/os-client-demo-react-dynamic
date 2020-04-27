const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const {
  isLocal, getConfigFile, getCoreSdkAlias, getDevPlugin,
  getDevHtmlTemplate,
} = require('./webpack/dev');
const { getPluginConfig } = require('./webpack/plugin-config');
const SummaryTreePlugin = require('./webpack/summary-tree-plugin');
const pluginConfig = getPluginConfig();

module.exports = (env) => {
  return {
    entry: {
      ...pluginConfig.entries,
      index: './app/index.tsx',
    },
    output: {
      filename: isLocal(env) ? 'assets/[name].js' : 'assets/[name]-[contenthash:8].js',
      path: path.resolve('./dist'),
      pathinfo: false,
    },
    plugins: [
      new HtmlWebpackPlugin({
        templateContent: getDevHtmlTemplate(env),
        filename: 'index.html',
        favicon: path.resolve('./app/favicon.ico'),
        excludeChunks: Object.keys(pluginConfig.entries)
      }),
      new CleanWebpackPlugin(),
      new SummaryTreePlugin(),
      ...getDevPlugin(env),
    ],
    module: {
      rules: [{
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
          },
          {
            loader: require.resolve('./webpack/plugin-loader'),
          }]
      }]
    },
    devServer: isLocal(env) ? {
      historyApiFallback: true,
      contentBase: path.resolve(__dirname, 'dist'),
      headers: { "Access-Control-Allow-Origin": "*" },
      host: '0.0.0.0',
      port: 4401,
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
            enforce: true,
          },
          core: {
            chunks: 'all',
            name: 'core',
            test: /[\\/]os-client-core[\\/]/,
            enforce: true,
          },
          ...pluginConfig.splitChunks,
        }
      }
    }
  };
};