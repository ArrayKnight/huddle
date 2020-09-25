module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: ['eslint:recommended'],
    parserOptions: {
        ecmaVersion: 2019,
        sourceType: 'module',
    },
    plugins: ['prettier'],
    overrides: [
        {
            files: ['.js'],
            extends: ['eslint:recommended', 'plugin:prettier/recommended'],
        },
        {
            files: ['*.svelte'],
            plugins: ['svelte3'],
            processor: 'svelte3/svelte3',
            settings: {
                'svelte3/ignore-styles': () => true,
            },
        },
    ],
}
