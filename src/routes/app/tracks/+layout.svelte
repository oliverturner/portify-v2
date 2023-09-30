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
					<div class="nav__item__label">
						<span>{item.name}</span>
						<span>{getArtistNames(item.artists)}</span>
					</div>
				</a>
			</li>
		{/each}
	</svelte:fragment>

	<slot />
</NavPage>
