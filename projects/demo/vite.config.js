import { sveltekit } from "@sveltejs/kit/vite";

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  optimizeDeps: {
    exclude: ["@babichjacob/svelte-localstorage"],
  },
  ssr: {
    noExternal: ["@babichjacob/svelte-localstorage"],
  },
};

export default config;
