<script lang="ts">
	import type { LayoutData } from "./$types";

	import { page } from "$app/stores";
	import { artists, getLink } from "./store";

	import NavPage from "$lib/components/nav-page.svelte";
	import NavItem from "$lib/components/nav-item.svelte";
	import { getInitialPage } from "$lib/utils/api";

	export let data: LayoutData;

	$: artists.set(data.following ?? getInitialPage());
	$: currentPath = $page.url.pathname;
</script>

<NavPage onNavScrollEnd={() => artists.loadNext($artists.next)}>
	<svelte:fragment slot="nav-items">
		{#each $artists.items as item (item.id)}
			<NavItem {...getLink(item, currentPath)}>
				<span slot="label">{item.name}</span>
			</NavItem>
		{/each}
	</svelte:fragment>

	<slot />
</NavPage>
