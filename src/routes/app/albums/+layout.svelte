<script lang="ts">
	import type { SavedAlbum } from "$lib/typings/spotify";
	import type { LayoutData } from "./$types";

	import { page } from "$app/stores";
	import { getArtistNames } from "$lib/utils/data";
	import NavPage from "$lib/components/nav-page.svelte";
	import NavItem from "$lib/components/nav-item.svelte";

	export let data: LayoutData;

	function getLink(item: SavedAlbum, currentPath: string) {
		const href = `/app/albums/${item.album.id}`;
		const isActive = currentPath === href;

		return { href, isActive };
	}

	$: currentPath = $page.url.pathname;
</script>

<NavPage>
	<svelte:fragment slot="nav-items">
		{#each data.albums?.items ?? [] as item (item.album.id)}
			<NavItem {...getLink(item, currentPath)}>
				<svelte:fragment slot="label">
					<span>{item.album.name}</span>
					<span>{getArtistNames(item.album.artists)}</span>
				</svelte:fragment>
			</NavItem>
		{/each}
	</svelte:fragment>

	<slot />
</NavPage>
