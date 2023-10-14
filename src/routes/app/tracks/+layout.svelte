<script lang="ts">
	import type { LayoutData } from "./$types";
	import type { Track } from "$lib/typings/spotify";

	import { page } from "$app/stores";
	import { getArtistNames } from "$lib/utils/artist";
	import NavPage from "$lib/components/nav-page.svelte";
	import NavItem from "$lib/components/nav-item.svelte";

	export let data: LayoutData;

	function getLink(item: Track, currentPath: string) {
		const href = `/app/tracks/${item.id}`;
		const isActive = currentPath.startsWith(href);

		return { href, isActive };
	}

	$: currentPath = $page.url.pathname;
</script>

<NavPage>
	<svelte:fragment slot="nav-items">
		{#each data.tracks?.items ?? [] as item (item.id)}
			<NavItem {...getLink(item, currentPath)}>
				<svelte:fragment slot="label">
					<span>{item.name}</span>
					<span class="item__artists">{getArtistNames(item.artists)}</span>
				</svelte:fragment>
			</NavItem>
		{/each}
	</svelte:fragment>

	<slot />
</NavPage>
