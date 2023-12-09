import type { Meta, StoryObj } from "@storybook/svelte";

type Story = StoryObj<typeof meta>;

import App from "./app.svelte";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: "App",
	component: App,
} satisfies Meta<App>;

export const LoggedIn: Story = {
	args: {
		avatar: "https://avatars.githubusercontent.com/u/1?v=4",
	},
	parameters: {
		sveltekit_experimental: {
			stores: {
				page: {
					url: new URL("app/playlists", "http://localhost:6006"),
				},
			},
			environment: {
				browser: false,
			},
		},
	},
};

export default meta;
