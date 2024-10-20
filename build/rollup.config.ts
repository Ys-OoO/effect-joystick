import type { RollupOptions } from "rollup";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import eslint from "@rollup/plugin-eslint";
import typescript from "@rollup/plugin-typescript";

const config :RollupOptions ={
	input: "src/index.ts",
	output: [
		{
			file: "dist/effect-joystick.commmon.js",
			format: "cjs",
			name: "effect-joystick",
		},
		{
			file: "dist/effect-joystick.umd.js",
			format: "umd",
			name: "effect-joystick",
		}
	],
	plugins: [
		typescript(),
		commonjs(),
		resolve(),
		eslint(),
		terser()
	]
};

export default config;