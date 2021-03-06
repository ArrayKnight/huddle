import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import copy from 'rollup-plugin-copy'
import json from '@rollup/plugin-json'
import livereload from 'rollup-plugin-livereload'
import resolve from '@rollup/plugin-node-resolve'
import serve from 'rollup-plugin-serve'
import svelte from 'rollup-plugin-svelte'
import { terser } from 'rollup-plugin-terser'
import typescript from '@rollup/plugin-typescript'
import visualizer from 'rollup-plugin-visualizer'
import autoPreprocess from 'svelte-preprocess'

const module = !process.env.NOMODULE
const production = !process.env.ROLLUP_WATCH

function typeCheck() {
    return {
        writeBundle() {
            require('child_process').spawn('svelte-check', {
                stdio: ['ignore', 'inherit', 'inherit'],
                shell: true,
            })
        },
    }
}

export default {
    input: 'src/index.ts',
    output: {
        sourcemap: !production,
        format: module ? 'es' : 'iife',
        file: `dist/app.${module ? 'mjs' : 'js'}`,
    },
    plugins: [
        resolve({
            browser: true,
            dedupe: ['svelte'],
            preferBuiltins: true,
        }),
        json(),
        typeCheck(),
        typescript({ sourceMap: !production }),
        svelte({
            dev: !production,
            css: (css) => {
                css.write('app.css', !production)
            },
            preprocess: autoPreprocess({
                babel: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                loose: true,
                                modules: false,
                                targets: {
                                    esmodules: true,
                                },
                            },
                        ],
                    ],
                    plugins: ['lodash'],
                },
                postcss: true,
            }),
        }),
        commonjs(),
        !module &&
            babel({
                babelHelpers: 'runtime',
                extensions: ['.js', '.mjs', '.svelte', '.ts'],
                exclude: ['node_modules/@babel/**', 'node_modules/core-js/**'],
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            targets: {
                                browsers: '> 0.5%, ie >= 11',
                            },
                            useBuiltIns: 'usage',
                            corejs: {
                                version: 3,
                                proposals: false,
                            },
                        },
                    ],
                ],
                plugins: [
                    [
                        '@babel/plugin-transform-runtime',
                        {
                            useESModules: true,
                        },
                    ],
                    'lodash',
                ],
            }),
        module &&
            copy({
                targets: [
                    {
                        src: 'src/index.html',
                        dest: 'dist',
                    },
                    {
                        src: 'src/assets/*.{png,json}',
                        dest: 'dist/assets',
                    },
                ],
            }),
        !production &&
            module &&
            serve({
                open: true,
                contentBase: 'dist',
            }),
        !production &&
            livereload({
                watch: 'dist',
                port: module ? 7000 : 7001,
            }),
        production && terser(),
        production &&
            visualizer({
                filename: `dist/stats.${module ? 'mjs' : 'es5'}.html`,
                gzipSize: true,
            }),
    ],
    watch: {
        clearScreen: false,
    },
}
