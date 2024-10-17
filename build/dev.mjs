import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import eslint from '@rollup/plugin-eslint';

export default {
  input: 'examples/demo/demo.js',
  output: {
    file: 'examples/demo/demo.min.js'
  },
  format: 'cjs',
  plugins: [eslint(), commonjs(), resolve()]
}