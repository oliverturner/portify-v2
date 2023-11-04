<script lang="ts">
	import type { SavedAlbum } from "$lib/typings/spotify";
	import type { LayoutData } from "./$types";

	import { page } from "$app/stores";
	import { albums, getLink } from "./store";

	import { getArtistNames } from "$lib/utils/artist";
	import { getInitialPage } from "$lib/utils/api";

	import NavPage from "$lib/components/nav-page.svelte";
	import NavItem from "$lib/components/nav-item.svelte";

	export let data: LayoutData;

	$: albums.set(data.albums ?? getInitialPage());
	$: currentPath = $page.url.pathname;
</script>

<NavPage onNavScrollEnd={() => albums.loadNext($albums.next)}>
	<svelte:fragment slot="nav-items">
		{#each $albums.items as item (item.album.id)}
			<NavItem {...getLink(item, currentPath)}>
				<svelte:fragment slot="label">
					<span>{item.album.name}</span>
					<span class="item__artists">{getArtistNames(item.album.artists)}</span>
				</svelte:fragment>
			</NavItem>
		{/each}
	</svelte:fragment>

	<slot />
</NavPage>
