const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlagin = require('html-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BabelEsmPlugin = require('babel-esm-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const compressionPlugin = new CompressionPlugin({
  test: [/\.js$/i, /\.css$/i]
});

const scriptExtHtmlWebpackPlugin = new ScriptExtHtmlWebpackPlugin({
  defer: [/legacy[\\/].*\.js$/],
  custom: [
    {
      test: /legacy[\\/].*\.js$/,
      attribute: 'nomodule',
    },
    {
      test: /modern[\\/].*\.js$/,
      attribute: 'type',
      value: 'module'
    },
  ]
})

const babelEsmPlugin = new BabelEsmPlugin({
  filename: isDev? 'js/modern/es6.[name].js' : 'js/modern/[contenthash].es6.[name].js',
  chunkFilename: isDev? 'js/modern/es6.[name].js' :'js/modern/[contenthash].es6.[name].js',
});

const htmlWebpackPlagin = new HtmlWebpackPlagin({
  title: 'examples',
  filename: 'index.html',
  template: './src/template/index.pug',
  inject: 'body',
  // scriptLoading: 'defer',
  chunks: ['index'],
  minify: {
    collapseWhitespace: !isDev,
    collapseInlineTagWhitespace: !isDev,
    minifyCSS: !isDev,
    minifyJS: !isDev
  },
})

const cleanWebpackPlugin = new CleanWebpackPlugin();

const stylelintPlugin = new StylelintPlugin({
  configFile: path.resolve(__dirname, '../stylelint.config.js'),
  files: 'src/**/*.css',
  fix: true
})

const eslintPlugin = new ESLintPlugin({
  files: 'src/**/*.js',
  overrideConfigFile: path.resolve(__dirname, '../.eslintrc.js'),
  lintDirtyModulesOnly: true
})

const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: isDev? 'css/[name].css' : 'css/[contenthash].[name].css',
  chunkFilename: isDev? 'css/[id].css' : 'css/[contenthash].[id].css'
})

module.exports = {
  miniCssExtractPlugin: miniCssExtractPlugin,
  htmlWebpackPlagin: htmlWebpackPlagin,
  stylelintPlugin: stylelintPlugin,
  eslintPlugin: eslintPlugin,
  cleanWebpackPlugin: cleanWebpackPlugin,
  compressionPlugin: compressionPlugin,
  babelEsmPlugin: babelEsmPlugin,
  scriptExtHtmlWebpackPlugin: scriptExtHtmlWebpackPlugin, 
};
