const path = require('path');
const webpack = require('webpack');
const BabiliPlugin = require('babili-webpack-plugin');

module.exports = function (cfg) {
  const paths = {
    ROOT_PATH: path.resolve(cfg.ROOT_PATH),
    VENDOR_PATH: path.resolve(cfg.VENDOR_PATH),
    SRC_PATH: path.resolve(cfg.SRC_PATH),
    OUT_PATH: path.resolve(cfg.OUT_PATH),
  };

  const plugins = [
    new webpack.EnvironmentPlugin({
      NODE_ENV: cfg.NODE_ENV,
    }),
    new webpack.NamedModulesPlugin(),
  ];

  if (cfg.IS_PROD) {
    plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      })
    );
    plugins.push(
      new BabiliPlugin()
    );
  }

  return {
    devtool: cfg.IS_PROD ? 'none' : 'eval-source-map',
    context: paths.SRC_PATH,
    output: {
      path: paths.OUT_PATH,
      filename: '[name].bundle.js',
      publicPath: cfg.JS_DIR,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
            'eslint-loader',
          ],
        },
      ],
    },
    resolve: {
      modules: cfg.INCLUDE_PATHS,
      alias: {
        'jquery': paths.VENDOR_PATH + '/jquery/src/jquery',
      },
    },
    plugins,
  };
};
