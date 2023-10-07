<script lang="ts">
	import type { LayoutData } from "./$types";

	import { page } from "$app/stores";
	import NavPage from "$lib/components/nav-page.svelte";
	import NavItem from "$lib/components/nav-item.svelte";
	import type { Artist } from "$lib/typings/spotify";

	export let data: LayoutData;

	function getLink(item: Artist) {
		const href = `/app/tracks/${item.id}`;
		const isActive = currentPath === href;
		const imgUrl = item.images.at(-1)?.url;

		return { href, isActive, imgUrl };
	}

	$: currentPath = $page.url.pathname;
</script>

<NavPage>
	<svelte:fragment slot="nav-items">
		{#each data.artists?.items ?? [] as item}
			<NavItem {...getLink(item)}>
				<span slot="label">{item.name}</span>
			</NavItem>
		{/each}
	</svelte:fragment>

	<slot />
</NavPage>
