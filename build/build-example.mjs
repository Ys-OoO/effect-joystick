import commonjs from "@rollup/plugin-commonjs"; // 将导入的其他包从commonJS转为ESM
import resolve from "@rollup/plugin-node-resolve";
import { rollup } from "rollup";
import terser from "@rollup/plugin-terser";
import eslint from '@rollup/plugin-eslint';

async function build(opts) {
  let bundle;
  try {
    bundle = await rollup({
      input: opts.input,
      plugins: [eslint(), commonjs(), resolve(), terser()]
    });

    await bundle.write({
      file: opts.output
    });
  } catch (err){
    console.error(err);
  }
};

build({
  input: 'examples/demo/demo.js',
  output: 'examples/demo/demo.min.js'
});
