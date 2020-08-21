const { getBabelPlugins, getJsxPragmaPlugins } = require('./src/plugins/getBabelPlugins');

const babelPlugins = getBabelPlugins();
const pragmaPlugins = getJsxPragmaPlugins();

const plugins = [...babelPlugins, ...pragmaPlugins];

module.exports = {
  env: {
    development: {
      presets: ['next/babel'],
      sourceMaps: true,
      plugins
    },
    production: {
      presets: ['next/babel'],
      sourceMaps: false,
      plugins
    },
    test: {
      presets: ['@babel/preset-env', '@babel/preset-react', 'next/babel'],
      sourceMaps: true,
      plugins
    }
  }
};
