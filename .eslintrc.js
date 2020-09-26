module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:prettier/recommended',
        'prettier/@typescript-eslint',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    rules: {
        '@typescript-eslint/explicit-function-return-type': [
            2,
            {
                allowExpressions: true,
                allowTypedFunctionExpressions: true,
                allowHigherOrderFunctions: true,
            },
        ],
        '@typescript-eslint/no-unsafe-assignment': [0],
        '@typescript-eslint/no-unsafe-member-access': [0],
        '@typescript-eslint/no-unsafe-return': [0],
        '@typescript-eslint/no-unused-vars': [1, { args: 'after-used' }],
        '@typescript-eslint/no-use-before-define': [
            2,
            {
                classes: true,
                functions: false,
                variables: true,
            },
        ],
        '@typescript-eslint/restrict-template-expressions': [0],
    },
    overrides: [
        {
            files: ['.js', '.ts'],
            plugins: ['@typescript-eslint', 'prettier'],
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
