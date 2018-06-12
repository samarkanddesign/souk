const withTypescript = require('@zeit/next-typescript');
const path = require('path');

const alias = {
  components: path.resolve(__dirname, 'components'),
  pages: path.resolve(__dirname, 'pages'),
  lib: path.resolve(__dirname, 'lib'),
  types: path.resolve(__dirname, 'types'),
};
module.exports = withTypescript({
  webpack: config => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          ...alias,
        },
      },
    };
  },
});
