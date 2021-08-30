const optimization = {
  concatenateModules: true,
  usedExports: true,
  providedExports: true,
  removeEmptyChunks: true,
  runtimeChunk: {
    name: 'runtime'
  },
  splitChunks: {
    cacheGroups: {
      vendors: {
        name: 'vendors',
        test: /[\\/]node_modules[\\/]/,
        chunks: 'all',
        enforce: true,
      },
    },
  },
}

module.exports = optimization;