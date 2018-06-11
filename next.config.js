const withTypescript = require('@zeit/next-typescript');
const path = require('path');

const alias = {
  components: path.resolve(__dirname, 'components'),
  pages: path.resolve(__dirname, 'pages'),
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
