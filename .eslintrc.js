module.exports = {
    env: {
        browser: false,
        es2021: true,
        node: true,
        mocha: true,
    },
    extends: 'airbnb-base',
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        indent: ['error', 4],
        'no-console': 'off',
    },
};
