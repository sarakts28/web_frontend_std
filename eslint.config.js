import pluginReact from 'eslint-plugin-react';
import pluginTypeScript from '@typescript-eslint/eslint-plugin';
import pluginImport from 'eslint-plugin-import';
import parserTypeScript from '@typescript-eslint/parser'; // Ensure this line is present
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginUnusedImports from 'eslint-plugin-unused-imports';

export default {
  files: ['**/*.{js,jsx,ts,tsx}'],
  languageOptions: {
    parser: parserTypeScript, // Use the TypeScript parser here
    ecmaVersion: 'latest',
    sourceType: 'module',
    globals: {
      window: 'readonly',
      document: 'readonly',
    },
  },
  plugins: {
    react: pluginReact,
    '@typescript-eslint': pluginTypeScript,
    import: pluginImport,
    'react-hooks': pluginReactHooks,
    'unused-imports': pluginUnusedImports,
  },
  rules: {
    quotes: ['error', 'single', { avoidEscape: true }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'import/extensions': [
      'error',
      'ignorePackages',
      { ts: 'never', tsx: 'never' },
    ],
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/explicit-function-return-type': ['off'],
    '@typescript-eslint/naming-convention': [
      'error',
      { selector: 'variable', format: ['camelCase', 'PascalCase'] },
      { selector: 'typeAlias', format: ['PascalCase'] },
      { selector: 'interface', format: ['PascalCase'] },
      { selector: 'function', format: ['PascalCase'] },
    ],
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'space-before-function-paren': ['error', 'always'],
    'space-before-blocks': ['error', 'always'],
    'space-infix-ops': 'error',
    'keyword-spacing': 'error',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'function', next: '*' },
      { blankLine: 'always', prev: 'block-like', next: '*' },
      { blankLine: 'always', prev: 'function', next: 'return' },
    ],
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],
    'lines-around-comment': [
      'error',
      {
        beforeBlockComment: true,
        allowBlockStart: true,
        applyDefaultIgnorePatterns: false,
      },
    ],
    'newline-after-var': ['error', 'always'],
    'max-len': ['warn', { code: 180 }],
    'react/function-component-definition': [
      'error',
      { namedComponents: 'arrow-function' },
    ],
  },

  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {},
    },
  },
  ignores: ['node_modules/', 'public/', 'build/', '*.css', '*.svg'],
};
