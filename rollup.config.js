import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import commonjs from 'rollup-plugin-commonjs';
import path from 'path';

const config = {
    moduleName: '@shenxiang11/virtual-scroll',
    input: path.resolve(__dirname, './src/components/virtual-scroller/index.js'),
    external: ['react', 'react-dom'],
    globals: {
        react: 'React',
        "react-dom": "ReactDOM",
    },
    output: [{
        name: 'virtual-scroll',
        format: 'es',
        file: 'es/index.js'
    }, {
        name: 'virtual-scroll',
        format: 'umd',
        file: 'lib/index.js'
    }],
    plugins: [
        resolve(),
        babel({
            exclude: '**/node_modules/**',
            runtimeHelpers: true
        }),
        commonjs(),
        postcss({
            extract: true,
            extensions: ['.less']
        })
    ]
}

export default config;
