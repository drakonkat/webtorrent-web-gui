import babel from '@rollup/plugin-babel';
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
        babel({
            exclude: 'node_modules/**'
        }),
        resolve(),
        commonjs(),
        del({targets: ['dist/*']}),
        svg()
    ],
    external: Object.keys(pkg.peerDependencies || {}),
};

