module.exports = (cfg, plugins, src, dest) => () => src(cfg.ENTRY)
  .pipe(plugins.ssi({ root: cfg.SSI_ROOT_PATH }))
  .pipe(plugins.rename({ extname: '.html' }))
  .pipe(dest(cfg.OUT_PATH));
