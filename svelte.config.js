import adapter from "@sveltejs/adapter-netlify";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: [".svelte"],
	preprocess: [vitePreprocess()],
	vitePlugin: {
		inspector: true,
	},
	kit: {
		adapter: adapter({
			edge: true,
		}),
	},
};

export default config;
