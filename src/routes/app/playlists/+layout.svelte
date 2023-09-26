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
					<span class="nav__item__title">{item.name}</span>
				</a>
			</li>
		{/each}
	</svelte:fragment>

	<slot />
</NavPage>

<style>
	.nav__item {
		grid-template-areas: "cover title";
		grid-template-rows: 1fr;
		align-items: center;

		&.nav__item--active {
			background-color: rgb(var(--color-secondary-900));
		}
	}

	.nav__item__title {
		grid-area: title;

		line-height: initial;
		font-size: 1rem;
	}
</style>
