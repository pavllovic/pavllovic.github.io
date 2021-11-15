const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

const commonConfig = {
  mode: isDev? 'development' : 'production',
  devtool: isDev? 'source-map' : '',
  resolve: {
    alias: {
      Components: path.resolve(__dirname, '../../src/components/'),
      Images: path.resolve(__dirname, '../../src/images/'),
      Lib: path.resolve(__dirname, '../../src/lib/'),
      Fonts: path.resolve(__dirname, '../../src/fonts/'),
      BD: path.resolve(__dirname, '../../src/bd/')
    }
  }
}

module.exports = commonConfig;