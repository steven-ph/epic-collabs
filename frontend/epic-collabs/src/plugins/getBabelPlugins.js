const getBabelPlugins = ({ libraryDirectory = 'lib' } = {}) => [
  [
    'styled-components',
    {
      ssr: true,
      displayName: true,
      preprocess: false
    }
  ],
  [
    'import',
    {
      libraryName: 'antd',
      libraryDirectory,
      style: false
    },
    'antd'
  ],
  [
    'import',
    {
      libraryName: '@ant-design/icons',
      libraryDirectory: `${libraryDirectory}/icons`,
      camel2DashComponentName: false
    },
    '@ant-design/icons'
  ],
  [
    'module-resolver',
    {
      root: ['./src']
    }
  ]
];

module.exports = {
  getBabelPlugins
};
