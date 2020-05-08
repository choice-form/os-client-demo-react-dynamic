const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const {
  isLocal, getConfigFile, getCoreSdkAlias, getDevPort,
  getDevPlugin, insureDistDir, getAssetsPath, getCdnFolder
} = require('./webpack/dev');
const { getStandardEntries, getSplitChunks } = require('./webpack//split-chunk');
const SummaryTreePlugin = require('./webpack/summary-tree-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LangPlugin = require('./webpack/lang-plugin/plugin');
// const os = require('os');
const { generateScssTree } = require('./webpack/scss');

generateScssTree();
insureDistDir();

const cdnFolder = getCdnFolder();
const splitChunks = getSplitChunks();
const standardEntries = getStandardEntries();

module.exports = (env) => {
  const local = isLocal(env);
  // 基本的样式加载器
  const basicScssLoaders = [
    {
      loader: 'css-loader'
    },
    // {
    //   loader: 'resolve-url-loader',
    //   options: {
    //     removeCR: os.platform() === 'win32' ? true : false
    //   }
    // },
    {
      loader: 'sass-loader',

    }
  ];
  const appScssLoaders = [{
    loader: MiniCssExtractPlugin.loader,
  }, ...basicScssLoaders];
  if (local) {
    appScssLoaders.unshift({
      loader: 'css-hot-loader',
    });
  }


  return {
    entry: {
      ...standardEntries,
      index: './src/app/index.tsx',
    },
    output: {
      filename: local
        ? `${cdnFolder}[name].js`
        : `${cdnFolder}[name]-[contenthash:8].js`,
      path: path.resolve('./dist'),
      pathinfo: false,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/app/index.html',
        filename: 'index.html',
        favicon: path.resolve('./src/app/favicon.ico'),
        excludeChunks: Object.keys(standardEntries)
      }),
      new CleanWebpackPlugin(),
      new SummaryTreePlugin(),
      new MiniCssExtractPlugin({
        filename: local
          ? `${cdnFolder}[name].css`
          : `${cdnFolder}[name]-[contenthash:8].css`,
      }),
      new LangPlugin({ directory: 'lang', local }),
      ...getDevPlugin(env),
    ],
    module: {
      rules: [
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                interpolate: true,
              },
            },
            {
              loader: path.resolve('./webpack/pre-html-loader'),
              options: {
                devSupport: local
                  ? `<script src='${cdnFolder}umd-legacy-with-i18n.js'></script>`
                  : '',
              }
            }
          ]
        },
        {
          test: /lang[\\/]\w+\.ts/,
          use: [{
            loader: LangPlugin.entryLoader,
            options: { local, prefix: getAssetsPath(env) }
          }]
        },
        {
          test: /\.tsx?$/,
          exclude: /lang[\\/]\w+\.ts/,
          use: [
            {
              loader: 'ts-loader',
            },
            {
              loader: require.resolve('./webpack/standards-loader'),
            },
            {
              loader: LangPlugin.codeLoader,
            }
          ]
        },
        {
          test: /\.scss$/,
          exclude: /src[\\/]plugin[\\/].+\.scss$/,
          use: appScssLoaders,
        },
        {
          test: /\.scss$/,
          exclude: /src[\\/]app[\\/].+\.scss$/,
          use: basicScssLoaders,
        }
      ]
    },
    devServer: local ? {
      historyApiFallback: true,
      contentBase: path.resolve(__dirname, 'dist'),
      headers: { "Access-Control-Allow-Origin": "*" },
      host: '0.0.0.0',
      port: getDevPort(),
      // watchContentBase: true,
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
          utils: {
            chunks: 'all',
            name: 'utils',
            test: /[\\/]src[\\/]utils[\\/]/,
            enforce: true,
          },
          ...splitChunks,
        }
      }
    }
  };
};