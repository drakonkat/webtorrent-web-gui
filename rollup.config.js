import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import external from 'rollup-plugin-peer-deps-external';
import del from 'rollup-plugin-delete';
import pkg from './package.json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import svg from "rollup-plugin-svg-import";


export default {
    input: pkg.source,
    output: [
        {
            file: pkg.main,
            format: "cjs",
            sourcemap: true,
        },
        {
            file: pkg.module,
            format: "esm",
            sourcemap: true,
        },
    ],
    plugins: [
        external(),
        json(),
        babel({
            exclude: 'node_modules/**'
        }),
        resolve({
            preferBuiltins: true,
            fallback: {
                "fs": false,
                "tls": false,
                "net": false,
                "path": false,
                "zlib": false,
                "http": false,
                "https": false,
                "stream": false,
                "crypto": false,
                "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify
            }
        }),
        commonjs(),
        del({targets: ['dist/*']}),
        svg()
    ],
    external: Object.keys(pkg.peerDependencies || {}),
};

