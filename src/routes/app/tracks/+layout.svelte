<script lang="ts">
	import type { LayoutData } from "./$types";
	import type { Track } from "$lib/typings/spotify";

	import { page } from "$app/stores";
	import { getArtistNames } from "$lib/utils/data";
	import NavPage from "$lib/components/nav-page.svelte";
	import NavItem from "$lib/components/nav-item.svelte";

	export let data: LayoutData;

	function getLink(item: Track) {
		const href = `/app/tracks/${item.id}`;
		const isActive = currentPath === href;
		const imgUrl = item.album.images.at(-1)?.url;

		return { href, isActive, imgUrl };
	}

	$: currentPath = $page.url.pathname;
</script>

<NavPage>
	<svelte:fragment slot="nav-items">
		{#each data.tracks?.items ?? [] as item}
			<NavItem {...getLink(item)}>
				<svelte:fragment slot="label">
					<span>{item.name}</span>
					<span>{getArtistNames(item.artists)}</span>
				</svelte:fragment>
			</NavItem>
		{/each}
	</svelte:fragment>

	<slot />
</NavPage>
