module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  clearMocks: true,
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json']
};
