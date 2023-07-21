import alias from "@rollup/plugin-alias";
import pluginVue from "@vitejs/plugin-vue";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "src/main.js",
  output: {
    dir: "dist",
    format: "es",
    chunkFileNames: "[name].js",
  },
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    alias({
      vue: "vue/dist/vue.runtime.esm-bundler.js",
    }),
    pluginVue(),
    nodeResolve(),
    terser(),
  ],
  preserveEntrySignatures: false,
};
