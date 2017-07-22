/* eslint-disable camelcase */
const path                    = require('path');
const webpack                 = require('webpack');
const ExtractTextPlugin       = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const ENV      = process.env.NODE_ENV || 'development';
const CSS_MAPS = ENV !== 'production';

const extractSass = new ExtractTextPlugin({
  filename: 'style.css',
  disable : ENV === 'development',
});

module.exports = {
  devtool: ENV === 'production' ? 'source-map' : 'cheap-eval-source-map',
  entry  : [
    './client/index.js',
    './client/styles/main.scss',
  ],
  output : {
    path      : path.join(__dirname, 'public'),
    filename  : 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    // currently don't have anything that needs it
    // alias     : {
    //   react      : 'preact-compat',yar
    //   'react-dom': 'preact-compat',
    // },
    modules   : [
      path.join(__dirname, './client/'),
      path.join(__dirname, 'node_modules'),
    ],
  },
  module : {
    rules: [
      {
        enforce: 'pre',
        test   : /\.jsx?$/,
        exclude: /node_modules/,
        loader : 'eslint-loader',
        options: {
          quiet    : true,
          emitError: ENV !== 'development',
        },
      }, {
        test   : /\.jsx?$/,
        exclude: /node_modules/,
        loader : 'babel-loader',
      }, {
        test  : /\.scss$/,
        loader: extractSass.extract({
          use: [
            {
              loader: `css-loader?sourceMap=${CSS_MAPS}`,
            }, {
              loader: 'resolve-url-loader',
            }, {
              loader: `sass-loader?sourceMap`,
            },
          ],
          
          fallback: 'style-loader',
        }),
      }, {
        test  : /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
        loader: ENV === 'production' ? 'file-loader' : 'url-loader',
      },
    ],
  },
  plugins: ([
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV),
    }),
    extractSass,
    new webpack.ProvidePlugin({
      h: ['preact', 'h'],
    }),
  ]).concat(ENV === 'production' ? [
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: { discardComments: { removeAll: true } },
    }),
    new webpack.optimize.UglifyJsPlugin({
      output  : {
        comments: false,
      },
      compress: {
        warnings    : false,
        conditionals: true,
        unused      : true,
        comparisons : true,
        sequences   : true,
        dead_code   : true,
        evaluate    : true,
        if_return   : true,
        join_vars   : true,
        negate_iife : false,
        pure_funcs  : [
          'classCallCheck',
          '_possibleConstructorReturn',
          '_classCallCheck',
          'Object.freeze',
          'invariant',
          'warning',
        ],
      },
    }),
  ] : []),
  stats  : { colors: true },
};
