<script lang="ts">
	import type { LayoutData } from "./$types";

	import { page } from "$app/stores";
	import NavPage from "$lib/components/nav-page.svelte";

	export let data: LayoutData;

	$: currentPath = $page.url.pathname;
</script>

<NavPage>
	<svelte:fragment slot="nav-items">
		{#each data.playlists?.items ?? [] as item}
			<li>
				<a
					class="nav__item"
					class:nav__item--active={currentPath === `/app/playlists/${item.id}`}
					href="/app/playlists/{item.id}"
				>
					<img class="nav__item__cover" src={item.images.at(-1)?.url} alt="Cover art" />
					<div class="nav__item__label">
						<span>{item.name}</span>
					</div>
				</a>
			</li>
		{/each}
	</svelte:fragment>

	<slot />
</NavPage>
