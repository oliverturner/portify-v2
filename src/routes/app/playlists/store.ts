import type { Playlist, TrackItem } from "$lib/typings/spotify";

import { createPageStore } from "$lib/stores/page";

export function getLink(item: Playlist, currentPath: string) {
	const href = `/app/playlists/${item.id}`;
	const isActive = currentPath === href;

	return { href, isActive };
}

export const playlists = createPageStore<Playlist<TrackItem>>("api/playlists");
