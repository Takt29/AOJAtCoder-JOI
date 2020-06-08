module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true
  },
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier/react',
  ],
  plugins: [
    'react',
    'prettier',
  ],
  rules: {
    'prettier/prettier': 'error'
  },
  settings: {
    'react': {
      'version': 'detect'
    }
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  overrides: [
    {
      'files': ['**/*.jsx'],
      'rules': {
        'react/prop-types': 'off'
      }
    }
  ]
}