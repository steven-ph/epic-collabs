const getBabelPlugins = () => [
  [
    'module-resolver',
    {
      root: ['./src']
    }
  ],
  'emotion',
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
      style: false
    },
    'antd'
  ],
  [
    'import',
    {
      libraryName: '@ant-design/icons',
      camel2DashComponentName: false
    },
    '@ant-design/icons'
  ]
];

const getJsxPragmaPlugins = () => [
  [
    '@emotion/babel-plugin-jsx-pragmatic',
    {
      module: 'theme-ui',
      import: 'jsx',
      export: 'jsx'
    }
  ],
  [
    '@babel/plugin-transform-react-jsx',
    {
      pragma: 'jsx',
      pragmaFrag: 'React.Fragment'
    }
  ]
];

module.exports = {
  getBabelPlugins,
  getJsxPragmaPlugins
};
