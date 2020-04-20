const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const isLocal = (env) => {
  return env.NODE_ENV === 'local';
};

module.exports = (env) => {
  return {
    entry: './src/index.ts',
    output: {
      filename: isLocal(env) ? '[name].js' : '[name]-[contenthash:8].js',
      path: path.resolve('./dist'),
      pathinfo: false,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        favicon: path.resolve('./public/favicon.ico')
      }),
      new CleanWebpackPlugin()
    ],
    module: {
      rules: [{
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
        }
      }]
    },
    devServer: isLocal(env) ? {
      contentBase: path.resolve(__dirname, 'dist'),
      headers: { "Access-Control-Allow-Origin": "*" },
      host: '0.0.0.0',
      port: 7076,
      hot: true,
    } : undefined

  };
}