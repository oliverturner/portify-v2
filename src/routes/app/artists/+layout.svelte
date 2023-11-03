<script lang="ts">
	import type { Artist } from "$lib/typings/spotify";
	import type { LayoutData } from "./$types";

	import { page } from "$app/stores";
	import { artists, initialPage } from "./store";

	import NavPage from "$lib/components/nav-page.svelte";
	import NavItem from "$lib/components/nav-item.svelte";

	export let data: LayoutData;

	function getLink(item: Artist, currentPath: string) {
		const href = `/app/artists/${item.id}`;
		const isActive = currentPath.startsWith(href);

		return { href, isActive };
	}

	$: artists.set(data.artists ?? initialPage);
	$: currentPath = $page.url.pathname;
</script>

<NavPage onNavScrollEnd={() => artists.loadNext($artists.next)}>
	<svelte:fragment slot="nav-items">
		{#each $artists.items as item (item.id)}
			<NavItem {...getLink(item, currentPath)}>
				<span slot="label">{item.name}</span>
			</NavItem>
		{/each}
	</svelte:fragment>

	<slot />
</NavPage>
