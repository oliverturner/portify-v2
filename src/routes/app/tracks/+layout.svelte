<script lang="ts">
	import type { LayoutData } from "./$types";

	import NavPage from "$lib/components/nav-page.svelte";
	import { getArtistNames } from "$lib/utils/data";

	export let data: LayoutData;
</script>

<NavPage>
	<svelte:fragment slot="nav-items">
		{#each data.tracks?.items ?? [] as item}
			<li>
				<a class="nav__item" href="/app/tracks/{item.id}">
					<img class="nav__item__cover" src={item.album.images.at(-1)?.url} alt="Cover art" />
					<span class="nav__item__title">{item.name}</span>
					<span class="nav__item__artists">{getArtistNames(item.artists)}</span>
				</a>
			</li>
		{/each}
	</svelte:fragment>

	<slot />
</NavPage>
