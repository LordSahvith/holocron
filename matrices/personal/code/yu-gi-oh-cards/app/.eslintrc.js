module.exports = {
    parser: 'babel-eslint',
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
        jest: true
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        sourceType: 'module'
    },
    plugins: ['react', 'prettier'],
    rules: {
        indent: ['error', 4, { SwitchCase: 2 }],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'alwasy'],
        'no-console': ['warn', { allow: ['clear', 'info', 'error', 'dir', 'trace'] }]
    }
};
