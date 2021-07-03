module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: ['plugin:react/recommended', 'airbnb', 'airbnb/hooks', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: 'module'
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.tsx', '.ts', '.js', '.json']
            },
            typescript: {}
        }
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        'import/extensions': [
            'ERROR',
            'ignorePackages',
            {
                ts: 'never',
                tsx: 'never',
                json: 'never',
                js: 'never'
            }
        ],
        'react/jsx-filename-extension': 'off',
        'no-use-before-define': 'off',
        semi: ['error', 'never'],
        'unicorn/prefer-query-selector': 'off',
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        indent: [1, 4],
        'react/jsx-indent': [1, 4],
        'comma-dangle': ['error', 'never'],
        'global-require': 'off',
        'operator-linebreak': 'off'
    }
}
