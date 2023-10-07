<script lang="ts">
	import type { Playlist } from "$lib/typings/spotify";
	import type { LayoutData } from "./$types";

	import { page } from "$app/stores";
	import NavPage from "$lib/components/nav-page.svelte";
	import NavItem from "$lib/components/nav-item.svelte";

	export let data: LayoutData;

	function getLink(item: Playlist) {
		const href = `/app/playlists/${item.id}`;
		const isActive = currentPath === href;
		const imgUrl = item.images.at(-1)?.url;

		return { href, isActive, imgUrl };
	}

	$: currentPath = $page.url.pathname;
</script>

<NavPage>
	<svelte:fragment slot="nav-items">
		{#each data.playlists?.items ?? [] as item}
			<NavItem {...getLink(item)}>
				<span slot="label">{item.name}</span>
			</NavItem>
		{/each}
	</svelte:fragment>

	<slot />
</NavPage>
