const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const {
  isLocal,
  getConfigFile,
  getCoreSdkAlias,
  getDevPort,
  getDevPlugin,
  insureDistDir,
  getAssetsPath,
  getCdnFolder,
} = require("./webpack/dev");
const {
  getStandardEntries,
  getSplitChunks,
} = require("./webpack/split-chunk");
const SummaryTreePlugin = require("./webpack/summary-tree-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const LangPlugin = require("./webpack/lang-plugin/plugin");
// const os = require('os');
const CopyPlugin = require("copy-webpack-plugin");
// const { generateScssTree } = require("./webpack/scss");

//generateScssTree();
insureDistDir();

const cdnFolder = getCdnFolder();
const splitChunks = getSplitChunks();
const standardEntries = getStandardEntries();

module.exports = (env) => {

  const local = isLocal(env);

  const getPostcssConfig = (local) => {
    const plugins = [
      require("tailwindcss")(),
      require("autoprefixer")(),
    ];
    if (!local) {
      plugins.push(require("@fullhuman/postcss-purgecss")({
        enable: true,
        content: [
          './src/**/*.html',
          './src/**/*.tsx',
          './src/**/*.jsx',
        ],
        // This is the function used to extract class names from your templates
        defaultExtractor: content => {
          // Capture as liberally as possible, including things like `h-(screen-1.5)`
          const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];

          // Capture classes within other delimiters like .block(class="w-1/2") in Pug
          const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];

          return broadMatches.concat(innerMatches);
        }
      }));
    }
    return plugins;
  };
  // 基本的样式加载器
  const basicScssLoaders = [
    {
      loader: "css-loader",
    },
    {
      loader: "postcss-loader",
      options: {
        ident: 'postcss',
        plugins: getPostcssConfig(local)
      }
    },
    {
      loader: "sass-loader",
    },
  ];
  const appScssLoaders = [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    ...basicScssLoaders,
  ];
  if (local) {
    appScssLoaders.unshift({
      loader: "css-hot-loader",
    });
  }

  return {
    stats: "minimal",
    entry: {
      ...standardEntries,
      index: "./src/app/index.tsx",
    },
    output: {
      filename: local
        ? `${cdnFolder}[name].js`
        : `${cdnFolder}[name]-[contenthash:8].js`,
      path: path.resolve("./dist"),
      pathinfo: false,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/app/index.html",
        filename: "index.html",
        excludeChunks: Object.keys(standardEntries),
      }),
      new CleanWebpackPlugin(),
      new SummaryTreePlugin({ local }),
      new MiniCssExtractPlugin({
        filename: local
          ? `${cdnFolder}[name].css`
          : `${cdnFolder}[name]-[contenthash:8].css`,
      }),
      new LangPlugin({ directory: "lang", local }),
      new CopyPlugin([
        {
          from: "src/app/public",
          to: "public",
        },
      ]),
      ...getDevPlugin(env),
    ],
    module: {
      rules: [
        {
          test: /[\\/]src[\\/]utils[\\/]i18n.ts/,
          use: [
            {
              loader: LangPlugin.loader,
              options: { local, prefix: getAssetsPath(env) },
            },
          ],
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "raw-loader",
            },
            {
              loader: path.resolve("./webpack/pre-html-loader"),
              options: {
                devSupport: local
                  ? `<script src='${cdnFolder}umd-legacy.js'></script>`
                  : "",
              },
            },
          ],
        },
        {
          test: /\.tsx?$/,
          exclude: /lang[\\/]\w+\.ts/,
          use: [
            {
              loader: "ts-loader",
            },
            {
              loader: require.resolve("./webpack/standards-loader"),
            },
          ],
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
        },
      ],
    },
    devServer: local
      ? {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, "dist"),
        headers: { "Access-Control-Allow-Origin": "*" },
        host: "0.0.0.0",
        port: getDevPort(),
        // 这下面这个配置如果开启,则每次任何更改,即使是样式也会重新刷新页面
        // 如果关闭,则更改样式不会刷新页面,但会更新样式效果,但是更改html片段也不会被刷新,看不到更新效果
        // 自己按需控制
        // watchContentBase: true,
        hot: true,
      }
      : undefined,
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      alias: {
        "web-pinyin": path.join(__dirname, "library/web-pinyin.js"),
        config: path.join(__dirname, `config/${getConfigFile(env)}.ts`),
        ...getCoreSdkAlias(env),
      },
    },
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        cacheGroups: {
          react: {
            chunks: "all",
            name: "react",
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            enforce: true,
          },
          core: {
            chunks: "all",
            name: "core",
            test: /[\\/]os-client-core[\\/]/,
            enforce: true,
          },
          utils: {
            chunks: "all",
            name: "utils",
            test: /[\\/]src[\\/]utils[\\/]/,
            enforce: true,
          },
          ...splitChunks,
        },
      },
    },
  };
};
