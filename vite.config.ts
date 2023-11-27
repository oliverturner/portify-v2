/// <reference types="vitest" />

import { sveltekit } from "@sveltejs/kit/vite";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [enhancedImages(), sveltekit()],
	server: { port: 4321 },
	test: {
		globals: true,
		include: ["**/__tests__/*.spec.ts"],
	},
});
