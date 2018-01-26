const path = require('path');
const through = require('through');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

module.exports = function (cfg, plugins, src, dest) {
  const WEBPACK_CONFIG = require(path.resolve(cfg.WEBPACK_CONFIG_PATH))(cfg);

  return function () {
    const stream = src(cfg.ENTRY)
      .pipe(plugins.chmod(755))
      .pipe(through(function(file) {
        file.named = path.basename(file.path, path.extname(file.path));
        this.queue(file)
      }))
      .pipe(webpackStream(WEBPACK_CONFIG, webpack, function(err, stats) {
        //do nothing here as the erros are handled by gulp-plumber
      }))
      .pipe(dest(cfg.OUT_PATH));

    return stream;
  };
};
