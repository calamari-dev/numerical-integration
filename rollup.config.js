import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "./src/index.ts",
    external: [/tslib/],
    output: [
      {
        file: "./dist/cjs/index.js",
        format: "cjs",
        exports: "auto",
      },
      {
        file: "./dist/esm/index.js",
        format: "es",
        exports: "auto",
      },
    ],
    plugins: [
      nodeResolve(),
      typescript(),
      replace({
        preventAssignment: true,
        values: { "process.env.NODE_ENV": "production" },
      }),
    ],
  },
  {
    input: "./src/index.ts",
    output: {
      file: "./dist/iife/index.js",
      format: "iife",
      name: "NUMINT",
      plugins: [terser({ format: { comments: () => false } })],
    },
    plugins: [
      nodeResolve(),
      typescript(),
      replace({
        preventAssignment: true,
        values: { "process.env.NODE_ENV": "production" },
      }),
    ],
  },
];
