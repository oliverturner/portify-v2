// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			auth: import("lucia").AuthRequest;
		}

		interface PageProps {
			playlists: unknown[];
		}
	}
}

/// <reference types="lucia" />
declare global {
	namespace Lucia {
		type Auth = import("$lib/server/lucia").Auth;
		type DatabaseUserAttributes = {
			username: string;
			access_token: string;
			refresh_token: string;
		};
		type DatabaseSessionAttributes = Record<string, never>;
	}
}

export {};
