import sequence from "svelte-sequential-preprocessor";
import adapter from "@sveltejs/adapter-netlify";
import { vitePreprocess } from "@sveltejs/kit/vite";
import { preprocessMeltUI } from "@melt-ui/pp";

/** @type {import('@sveltejs/kit').Config}*/
const config = {
	extensions: [".svelte"],
	preprocess: sequence([vitePreprocess(), preprocessMeltUI()]),
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
