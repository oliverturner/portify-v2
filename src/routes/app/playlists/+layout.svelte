<script lang="ts">
	import type { Playlist } from "$lib/typings/spotify";
	import type { LayoutData } from "./$types";

	import { page } from "$app/stores";
	import { playlists } from "./store";

	import NavPage from "$lib/components/nav-page.svelte";
	import NavItem from "$lib/components/nav-item.svelte";

	export let data: LayoutData;

	function getLink(item: Playlist, currentPath: string) {
		const href = `/app/playlists/${item.id}`;
		const isActive = currentPath === href;

		return { href, isActive };
	}

	$: playlists.set(data.playlists);
	$: currentPath = $page.url.pathname;
</script>

<NavPage onNavScrollEnd={() => playlists.loadNext($playlists.next)}>
	<svelte:fragment slot="nav-items">
		{#each $playlists.items as item (item.id)}
			<NavItem {...getLink(item, currentPath)}>
				<span slot="label">{item.name}</span>
			</NavItem>
		{/each}
	</svelte:fragment>

	<slot />
</NavPage>
