import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      fallback: "fallback.html",
    }),

    vite: {
      optimizeDeps: {
        exclude: ["@babichjacob/svelte-localstorage"],
      },
      // @ts-ignore
      ssr: {
        noExternal: ["@babichjacob/svelte-localstorage"],
      },
    },
  },
};

export default config;
