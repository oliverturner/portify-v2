<script lang="ts">
	import type { LayoutData } from "./$types";

	import { page } from "$app/stores";
	import { playlists, getLink } from "./store";

	import NavPage from "$lib/components/nav-page.svelte";
	import NavItem from "$lib/components/nav-item.svelte";
	import { getInitialPage } from "$lib/utils/api";

	export let data: LayoutData;

	$: playlists.set(data.playlists ?? getInitialPage());
	$: currentPath = $page.url.pathname;
</script>

<NavPage onNavScrollEnd={() => playlists.loadNext($playlists.next)}>
	<svelte:fragment slot="nav-items">
		{#each $playlists.items as item (item.id)}
			<NavItem {...getLink(item, currentPath)}>
				<div class="playlist" slot="label">
					<span>{item.name}</span>
					<span class="badge">{item.tracks?.total ?? 0}</span>
				</div>
			</NavItem>
		{/each}
	</svelte:fragment>

	<slot />
</NavPage>

<style>
	.playlist {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;

		& .badge {
			border: 1px solid var(--border-1);
			border-radius: 1rem;
			padding: 0.25rem 0.75rem;
		}
	}
</style>
