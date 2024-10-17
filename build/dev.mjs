import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

export default {
  input: 'examples/pure-js/demo.js',
  output: {
    file: 'example/pure-js/demo.min.js'
  },
  format: 'cjs',
  plugins: [commonjs(), resolve()]
};