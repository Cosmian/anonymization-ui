const rewireLess = require('react-app-rewire-less');

module.exports = config => {
  require('react-app-rewire-postcss')(config, {
    plugins: loader => [
      require('postcss-rtl')()
    ]
  });

  config = rewireLess.withLoaderOptions({ javascriptEnabled: true })(config);

  return config;
};
