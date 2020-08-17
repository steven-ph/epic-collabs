const withPlugins = require('next-compose-plugins');
const { getConfig } = require('./src/config');
const { withCss } = require('./src/plugins/withCss');
const { withAlias } = require('./src/plugins/withAlias');
const { withPolyfills } = require('./src/plugins/withPolyfills');
const { withSourceMaps } = require('./src/plugins/withSourceMaps');

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.css'] = () => {};
}

const env = process.env.STAGE;

if (!env) {
  throw new Error('Please set the STAGE env variable');
}

const config = getConfig(env);

module.exports = withPlugins(
  [withAlias, withCss, withPolyfills, withSourceMaps],
  {
    env: config,
    target: 'serverless'
  }
);