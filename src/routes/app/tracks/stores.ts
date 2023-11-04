import type { Track } from "$lib/typings/spotify";

import { createPageStore } from "$lib/stores/page";

export function getLink(item: Track, currentPath: string) {
	const href = `/app/tracks/${item.id}`;
	const isActive = currentPath.startsWith(href);

	return { href, isActive };
}

export const tracks = createPageStore<Track>("api/tracks");
