<script lang="ts">
	import type { LayoutData } from "./$types";

	import { page } from "$app/stores";
	import { playlists, getLink } from "./store";

	import NavPage from "$lib/components/nav-page.svelte";
	import NavItem from "$lib/components/nav-item.svelte";

	export let data: LayoutData;

	$: playlists.set(data);
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
