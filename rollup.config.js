import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: 'src/index.js',
    output: {
        file: 'build/app.js',
        format: 'umd',
        name: 'app',
    },
    plugins: [
        resolve({
            jsnext: true,
            //only: ['fmin'],
            main: true
        }),
        commonjs()
    ]
};