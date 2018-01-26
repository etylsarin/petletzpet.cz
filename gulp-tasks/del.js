const del = require('del');

module.exports = cfg => () => del([cfg.ENTRY], { force: true });
