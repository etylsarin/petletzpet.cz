const browserSync = require('browser-sync');

module.exports = cfg => () => {
  browserSync(Object.assign({
    server: {
      baseDir: cfg.ENTRY,
    },
  }, {
    host: cfg.DEV_SERVER_HOST,
    port: cfg.DEV_SERVER_PORT,
    files: [
      `${cfg.OUT_PATH}/**/*.html`,
      `${cfg.OUT_PATH}/**/*.css`,
      `${cfg.OUT_PATH}/**/*.+(js|jsx)`,
      `${cfg.OUT_PATH}/**/*.+(svg|png)`,
    ],
  }));
};
