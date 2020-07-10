// needed to import & bundle from node_modules/
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: './src/app.js',
  output: {
    dir: 'dist',
    format: 'iife',
  },
  plugins: [resolve(), commonjs()],
};
