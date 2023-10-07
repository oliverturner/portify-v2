<script lang="ts">
	import type { LayoutData } from "./$types";

	import { page } from "$app/stores";
	import { getArtistNames } from "$lib/utils/data";
	import NavPage from "$lib/components/nav-page.svelte";
	import NavItem from "$lib/components/nav-item.svelte";
	import type { SavedAlbum } from "$lib/typings/spotify";

	export let data: LayoutData;

	function getLink(item: SavedAlbum) {
		const href = `/app/tracks/${item.album.id}`;
		const isActive = currentPath === href;
		const imgUrl = item.album.images.at(-1)?.url;

		return { href, isActive, imgUrl };
	}

	$: currentPath = $page.url.pathname;
</script>

<NavPage>
	<svelte:fragment slot="nav-items">
		{#each data.albums?.items ?? [] as item}
			<NavItem {...getLink(item)}>
				<svelte:fragment slot="label">
					<span>{item.album.name}</span>
					<span>{getArtistNames(item.album.artists)}</span>
				</svelte:fragment>
			</NavItem>
		{/each}
	</svelte:fragment>

	<slot />
</NavPage>
