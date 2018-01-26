const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const importOnce = require('node-sass-import-once');

function getSassSettings(INCLUDE_PATHS = []) {
  return {
    includePaths: INCLUDE_PATHS,
    precision: 9,
    importer: importOnce,
    importOnce: {
      index: false,
      css: true,
      bower: false,
    },
  };
}

function getPostCssSettings(SVG_PATH, UNCSS_CONFIG, IS_PROD) {
  return {
    autoprefixer: autoprefixer({
      browsers: [
        '> 2%',
        'last 2 version',
        'ie 9-11',
        'not ie <= 8',
      ],
    }),
    cssnano: IS_PROD ? cssnano({
      discardComments: { removeAll: true },
      autoprefixer: false,
    }) : undefined,
  };
}

module.exports = (cfg, plugins, src, dest) => {
  const settings = getPostCssSettings(cfg.SVG_PATH || cfg.SRC_PATH, cfg.UNCSS_CONFIG, cfg.IS_PROD);
  const cleanArray = arr => arr.filter(item => item !== undefined);

  return () => {
    const stream = src(cfg.ENTRY)
      .pipe(plugins.if(cfg.IS_DEV, plugins.sourcemaps.init()))
      .pipe(plugins.sass(getSassSettings(cfg.INCLUDE_PATHS)).on('error', plugins.sass.logError))
      .pipe(plugins.postcss(cleanArray([
        settings.cssnano,
        settings.autoprefixer,
      ])))
      .pipe(plugins.if(cfg.IS_DEV, plugins.sourcemaps.write('.')))
      .pipe(dest(cfg.OUT_PATH));

    return stream;
  };
};
