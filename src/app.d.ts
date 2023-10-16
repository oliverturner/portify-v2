// See https://kit.svelte.dev/docs/types#app

import type { Album, Artist, Page, Playlist, Track } from "$lib/typings/spotify";

// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			auth: import("lucia").AuthRequest;
		}

		interface PageProps {
			username: string;
			albums: Page<Album>;
			album: Album;
			artists: Page<Artist>;
			artist: Artist;
			playlists: Page<Playlist>;
			playlist: Playlist;
			tracks: Page<Track>;
			track: Track;
		}
	}

	interface Document {
		startViewTransition: (callback) => Promise<void>;
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
			expires_at: number;
		};
		type DatabaseSessionAttributes = Record<string, never>;
	}
}

export {};
