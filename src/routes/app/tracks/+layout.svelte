<script lang="ts">
	import type { LayoutData } from "./$types";

	import { page } from "$app/stores";
	import { getLink, tracks } from "./stores";

	import { getArtistNames } from "$lib/utils/artist";
	import { getInitialPage } from "$lib/utils/api";

	import NavPage from "$lib/components/nav-page.svelte";
	import NavItem from "$lib/components/nav-item.svelte";

	export let data: LayoutData;

	$: tracks.set(data.tracks ?? getInitialPage());
	$: currentPath = $page.url.pathname;
</script>

<NavPage onNavScrollEnd={() => tracks.loadNext($tracks.next)}>
	<svelte:fragment slot="nav-items">
		{#each $tracks.items as item (item.id)}
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
