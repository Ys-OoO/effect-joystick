import type { RollupOptions } from "rollup";
import commonjs from "@rollup/plugin-commonjs"; // 将导入的其他包从commonJS转为ESM
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import eslint from "@rollup/plugin-eslint";
import typescript from "@rollup/plugin-typescript";

const config :RollupOptions ={
	input: "examples/demo/demo.ts",
	output: {
		file: "examples/demo/demo.min.js",
		format: "cjs",
		plugins: []
	},
	plugins: [
		typescript(),
		commonjs(),
		resolve(),
		eslint(),
		terser()
	]
};

export default config;