const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const defaults = require('../build.config.js');

// Load gulp plugins
const plugins = gulpLoadPlugins();

// Error handling helper
function errorHandler(error = {}) {
  // Output an error message & beep
  plugins.util.log(plugins.util.colors.red.bold(`Error (${error.plugin}): ${error.message}`));
  plugins.util.beep();
  // emit the end event, to properly end the task
  this.emit('end');
}

// Overwrite the gulp.src method to eliminate the need of adding the error handler to each task
const gulpSrc = gulp.src;
gulp.src = function src(...args) {
  return gulpSrc
    .apply(gulp, args)
    .pipe(plugins.plumber(errorHandler))
    .pipe(plugins.chmod(755));
};

module.exports = (task, cfg = {}) => require(`./${task}`)(Object.assign({}, defaults, cfg), plugins, gulp.src, gulp.dest); // eslint-disable-line import/no-dynamic-require, global-require
