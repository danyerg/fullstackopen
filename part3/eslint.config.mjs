import js from '@eslint/js'
import globals from 'globals'
import stylistic from '@stylistic/eslint-plugin'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: globals.node },
    plugins: { js, stylistic },
    extends: ['js/recommended'],
    rules: {
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': 0,
    'arrow-spacing': 0,
    'no-console': 0
}
  },
  globalIgnores(['./dist/'])
])