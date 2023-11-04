import type { Page } from "$lib/typings/spotify";

export function getInitialPage<TItemType>(): Page<TItemType> {
	return {
		items: [],
		total: 0,
		offset: 0,
		limit: 0,
		href: "",
		next: null,
		previous: null,
	};
}
