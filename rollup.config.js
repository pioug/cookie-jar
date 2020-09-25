import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import css from "rollup-plugin-css-only";
import pluginVue from "rollup-plugin-vue";
import replace from "@rollup/plugin-replace";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/main.js",
  output: {
    dir: "dist",
    format: "es",
    chunkFileNames: "[name].js",
  },
  plugins: [
    css({ output: "dist/bundle.css" }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    alias({
      vue: "vue/dist/vue.runtime.esm-bundler.js",
    }),
    pluginVue(),
    nodeResolve(),
    commonjs(),
    terser(),
  ],
  preserveEntrySignatures: false,
};
