<script lang="ts">
	import type { PageData } from "./$types";

	import NavPage from "$lib/components/nav-page.svelte";

	export let data: PageData;

	console.log({ root: data });
</script>

<NavPage>
	<svelte:fragment slot="nav-items">
		{#each data.playlists?.items ?? [] as item}
			<li>
				<a href="/app/playlists/{item.id}">{item.name}</a>
			</li>
		{/each}
	</svelte:fragment>

	<slot />
</NavPage>
