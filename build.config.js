const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_DEV = NODE_ENV === 'development';
const IS_PROD = NODE_ENV === 'production';

const DEV_SERVER_HOST = 'localhost';
const DEV_SERVER_PORT = 3000;

const ROOT_PATH = './';
const SRC_PATH = ROOT_PATH + 'src';
const OUT_PATH = process.env.npm_package_config_dest || ROOT_PATH;
const OUT_DIR = '/dist';
const VENDOR_PATH = ROOT_PATH + 'node_modules';

const JS_DIR = '/js';
const CSS_DIR = '/css';
const IMG_DIR = '/img';

module.exports = {
  // environmental
  NODE_ENV,
  IS_DEV,
  IS_PROD,
  // dev server
  DEV_SERVER_HOST,
  DEV_SERVER_PORT,
  // paths
  SRC_PATH,
  OUT_PATH,
  OUT_DIR,
  ROOT_PATH,
  VENDOR_PATH,
  // directories
  JS_DIR,
  CSS_DIR,
  IMG_DIR,
};
