import type { Artist } from "$lib/typings/spotify";

import { createPageStore } from "$lib/stores/page";

export function getLink(item: Artist, currentPath: string) {
	const href = `/app/artists/${item.id}`;
	const isActive = currentPath.startsWith(href);

	return { href, isActive };
}

export const artists = createPageStore<Artist>("api/artists/following");
