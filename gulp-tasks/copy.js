module.exports = (cfg, plugins, src, dest) => () => src(cfg.ENTRY)
  .pipe(plugins.changed(cfg.OUT_PATH))
  .pipe(dest(cfg.OUT_PATH));
