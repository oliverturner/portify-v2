<script lang="ts">
	import type { LayoutData } from "./$types";

	import NavPage from "$lib/components/nav-page.svelte";

	export let data: LayoutData;
</script>

<NavPage>
	<svelte:fragment slot="nav-items">
		{#each data.artists?.items ?? [] as item}
			<li>
				<a class="nav__item" href="/app/artists/{item.id}">
					<img class="nav__item__cover" src={item.images.at(-1)?.url} alt="Cover art" />
					<div class="nav__item__label">{item.name}</div>
				</a>
			</li>
		{/each}
	</svelte:fragment>

	<slot />
</NavPage>
