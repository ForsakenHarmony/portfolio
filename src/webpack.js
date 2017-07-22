'use strict';

const webpack = require('webpack');
const hot     = require('webpack-hot-middleware');
const dev     = require('webpack-dev-middleware');
const config  = require('../webpack.config');

module.exports = function webpackMiddleware(app) {
  config.entry = [
    ...config.entry,
    'webpack-hot-middleware/client',
  ];
  
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
  
  const compiler = webpack(config);
  
  const devMiddleware = dev(compiler, { noInfo: true, publicPath: '/' });
  const hotMiddleware = hot(compiler);
  
  app.use(devMiddleware);
  app.use(hotMiddleware);
};
