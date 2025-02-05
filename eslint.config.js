import pluginVue from 'eslint-plugin-vue';
import vueTsEslintConfig from '@vue/eslint-config-typescript';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default [
  // Define lintable files
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  // Ignore patterns
  // {
  //   name: 'app/files-to-ignore',
  //   ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  // },

  // Essential Vue rules
  ...pluginVue.configs['flat/essential'],

  // TypeScript-specific configurations
  ...vueTsEslintConfig(),

  // Prettier skip formatting for compatibility
  skipFormatting,

  // Additional custom rules and configurations
  {
    name: 'custom-rules',
    files: ['**/*.vue'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'vue/component-api-style': ['error', ['script-setup', 'composition']],
      'vue/block-lang': [
        'error',
        {
          script: { lang: 'ts' },
        },
      ],
      'vue/component-tags-order': [
        'error',
        {
          order: ['template', 'script', 'style'],
        },
      ],
      'tailwindcss/no-custom-classname': 'error',
    },
  },
];
