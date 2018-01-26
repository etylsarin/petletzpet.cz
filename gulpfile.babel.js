// Node requires - gulp, etc.
const path = require('path');
const gulp = require('gulp');
const runSequence = require('run-sequence');

// Configuration object made up from build.config file
const cfg = require(path.resolve('./build.config.js'));
const DEST = path.normalize(cfg.OUT_PATH + cfg.OUT_DIR);

// Load external gulp tasks
const getTask = require(path.resolve('./gulp-tasks'));

//=============================================
// MAIN TASKS - defined in package.json
//=============================================

// Default task which builds assets, watch changes and runs a server
gulp.task('default', function (cb) {
  runSequence('build', ['watch', 'serve'], cb);
});

// Task for building assets
gulp.task('build', function (cb) {
  runSequence('clean', 'static', ['scripts', 'styles', 'images', 'json'], cb);
});

// Task for watching asset changes
gulp.task('watch', function (cb) {
  runSequence(['scripts:watch', 'styles:watch', 'images:watch', 'static:watch', 'json:watch'], cb);
});

// Task for cleaning up dist folder
gulp.task('clean', function (cb) {
  runSequence('clean', cb);
});

//=============================================
// LOAD GRANULAR TASKS
//=============================================

gulp.task('scripts', getTask('webpack', {
  ENTRY: `${cfg.SRC_PATH}/*.+(js|jsx)`,
  OUT_PATH: DEST + cfg.JS_DIR,
  INCLUDE_PATHS: [cfg.SRC_PATH, cfg.VENDOR_PATH],
  WEBPACK_CONFIG_PATH: `${cfg.ROOT_PATH}/webpack.config.js`,
}));

gulp.task('styles', getTask('sass', {
  ENTRY: cfg.SRC_PATH + '/*.scss',
  OUT_PATH: DEST + cfg.CSS_DIR,
  INCLUDE_PATHS: [cfg.SRC_PATH, cfg.VENDOR_PATH],
}));

gulp.task('images', getTask('copy', {
  ENTRY: cfg.SRC_PATH + cfg.IMG_DIR + '/**/*.jpg',
  OUT_PATH: DEST + cfg.IMG_DIR,
}));

gulp.task('clean', getTask('del', {
  ENTRY: DEST,
}));

gulp.task('json', getTask('copy', {
  ENTRY: cfg.SRC_PATH + '/*.json',
  OUT_PATH: DEST,
}));

gulp.task('static', getTask('ssi', {
  ENTRY: cfg.SRC_PATH + '/*.shtml',
  OUT_PATH: DEST,
}));

gulp.task('serve', getTask('browsersync', {
  ENTRY: DEST,
  OUT_PATH: DEST,
}));


//=============================================
// WATCHERS
//=============================================

gulp.task('scripts:watch', () => {
  gulp.watch(`${cfg.SRC_PATH}/**/*.+(js|jsx)`, ['scripts']);
});

gulp.task('styles:watch', function () {
  gulp.watch(cfg.SRC_PATH + '/*.scss', ['styles']);
});

gulp.task('images:watch', function () {
  gulp.watch(cfg.SRC_PATH + '/img/*.jpg', ['images']);
});

gulp.task('static:watch', function () {
  gulp.watch(cfg.SRC_PATH + '/*.shtml', ['static']);
});

gulp.task('json:watch', function () {
  gulp.watch(cfg.SRC_PATH + '/*.json', ['json']);
});
