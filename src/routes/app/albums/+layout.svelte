<script lang="ts">
	import type { LayoutData } from "./$types";

	import NavPage from "$lib/components/nav-page.svelte";
	import { getArtistNames } from "$lib/utils/data";

	export let data: LayoutData;
</script>

<NavPage>
	<svelte:fragment slot="nav-items">
		{#each data.albums?.items ?? [] as item}
			<li>
				<a class="nav__item" href="/app/albums/{item.album.id}">
					<img class="nav__item__cover" src={item.album.images.at(-1)?.url} alt="Cover art" />
					<span class="nav__item__title">{item.album.name}</span>
					<span class="nav__item__artists">{getArtistNames(item.album.artists)}</span>
				</a>
			</li>
		{/each}
	</svelte:fragment>

	<slot />
</NavPage>

