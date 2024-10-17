import { eslint } from "rollup-plugin-eslint";
import commonjs from "rollup-plugin-commonjs"; // 将导入的其他包从commonJS转为ESM
import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "example/pure-js/demo.js",
  output: {
    file: "example/pure-js/demo.min.js",
    format: "cjs",
    plugins: [
      eslint({
        throwOnError: true,
        throwOnWarning: true,
        include: ["example/pure-js/*.js"],
      }),
      // commonjs(),
      // resolve(),
    ],
  },
};
