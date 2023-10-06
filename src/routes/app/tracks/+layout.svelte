<script lang="ts">
	import type { LayoutData } from "./$types";
	import type { Track } from "$lib/typings/spotify";

	import { page } from "$app/stores";
	import { getArtistNames } from "$lib/utils/data";
	import NavPage from "$lib/components/nav-page.svelte";
	import NavItem from "$lib/components/nav-item.svelte";

	export let data: LayoutData;

	const isActive = (path: string) => currentPath === path;

	function getLink(item: Track): { href: string; isActive: boolean } {
		const href = `/app/tracks/${item.album.id}`;
		return { href, isActive: isActive(href) };
	}

	$: currentPath = $page.url.pathname;
</script>

<NavPage>
	<svelte:fragment slot="nav-items">
		{#each data.tracks?.items ?? [] as item}
			<NavItem {...getLink(item)} imgUrl={item.album.images.at(-1)?.url}>
				<svelte:fragment slot="label">
					<span>{item.name}</span>
					<span>{getArtistNames(item.artists)}</span>
				</svelte:fragment>
			</NavItem>
		{/each}
	</svelte:fragment>

	<slot />
</NavPage>
