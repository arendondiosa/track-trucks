import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettierConfig from 'eslint-config-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node,
        google: 'readonly',
        process: 'writable',
        global: 'writable',
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  // Specific configuration for test files
  {
    files: ['**/__tests__/**/*.{js,jsx}', '**/*.test.{js,jsx}', '**/*.spec.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.jest,
        beforeEach: 'readonly',
        describe: 'readonly',
        expect: 'readonly',
        test: 'readonly',
        jest: 'readonly',
        it: 'readonly',
      }
    },
    rules: {
      // Relaxed rules for test files
      'no-undef': 'error',
      'react-hooks/rules-of-hooks': 'off' // Sometimes we need to break rules in tests
    }
  },
  // Configuration for jest.setup.js and other config files
  {
    files: ['jest.setup.js', 'jest.config.mjs'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
        process: 'writable',
        global: 'writable',
      }
    },
  },
  // This configuration should be last to override other configurations
  prettierConfig
])
