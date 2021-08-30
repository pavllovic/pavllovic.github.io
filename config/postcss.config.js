const isDev = process.env.NODE_ENV === 'development';

// recommend
module.exports = {
  plugins: [
    'postcss-import',
    ['postcss-preset-env', { 
      stage: 2,
      features: {
        'custom-properties': false,
        'focus-visible-pseudo-class': false
      }
    }],
    ['cssnano', isDev? false : {}]
  ],
};

// work but deprecated
// module.exports = {
//   plugins: {
//     'postcss-import': {},
//     'postcss-preset-env': {
//       stage:2,
//       features: {
//         'custom-properties': false,
//         'focus-visible-pseudo-class': false
//       }
//     },
//     'cssnano': isDev? false : {}
//   },
// };