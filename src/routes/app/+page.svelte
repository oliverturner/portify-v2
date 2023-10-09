<script lang="ts">
	import type { Playlist } from "$lib/typings/spotify";
	import type { PageData } from "./$types";

	import { page } from "$app/stores";
	import NavPage from "$lib/components/nav-page.svelte";
	import NavItem from "$lib/components/nav-item.svelte";

	export let data: PageData;

	function getLink(item: Playlist, currentPath: string) {
		const href = `/app/playlists/${item.id}`;
		const isActive = currentPath === href;

		return { href, isActive };
	}

	$: currentPath = $page.url.pathname;
</script>

<NavPage>
	<svelte:fragment slot="nav-items">
		{#each data.playlists?.items ?? [] as item (item.id)}
			<NavItem {...getLink(item, currentPath)}>
				<span slot="label">{item.name}</span>
			</NavItem>
		{/each}
	</svelte:fragment>

	<slot />
</NavPage>
