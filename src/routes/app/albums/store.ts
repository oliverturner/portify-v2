import type { SavedAlbum } from "$lib/typings/spotify";

import { createPageStore } from "$lib/stores/page";

export function getLink(item: SavedAlbum, currentPath: string) {
	const href = `/app/albums/${item.album.id}`;
	const isActive = currentPath === href;

	return { href, isActive };
}

export const albums = createPageStore<SavedAlbum>("api/albums");
