// ESLint for the canvas (v51.22). Lives in the test kit, not the app.
// Run with `npm run lint`; lint.js compares each file's count with lint-baseline.json.
const react = require('eslint-plugin-react');
const hooks = require('eslint-plugin-react-hooks');

module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: {
        window: 'readonly', document: 'readonly', navigator: 'readonly', console: 'readonly',
        localStorage: 'readonly', setTimeout: 'readonly', clearTimeout: 'readonly',
        requestAnimationFrame: 'readonly', cancelAnimationFrame: 'readonly',
        ResizeObserver: 'readonly', getComputedStyle: 'readonly', globalThis: 'readonly',
        setInterval: 'readonly', clearInterval: 'readonly', matchMedia: 'readonly', Intl: 'readonly',
        CustomEvent: 'readonly', Event: 'readonly', FormData: 'readonly', Image: 'readonly', URL: 'readonly',
        fetch: 'readonly', MutationObserver: 'readonly', IntersectionObserver: 'readonly', HTMLElement: 'readonly',
      },
    },
    settings: { react: { version: '18.2' } },
    plugins: { react, 'react-hooks': hooks },
    // Every rule is a warning or an error; lint.js counts both per file against lint-baseline.json.
    // Unused catch names (catch (e) {}) and unused arguments are not findings.
    rules: {
      'no-unused-vars': ['warn', { args: 'none', caughtErrors: 'none', ignoreRestSiblings: true }],
      'no-undef': 'error',
      'no-dupe-keys': 'error',
      'no-unreachable': 'warn',
      'react/jsx-uses-vars': 'error',
      'react/jsx-uses-react': 'error',
      'react/jsx-key': 'warn',
      'react/jsx-no-undef': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
];
