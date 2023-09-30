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
					<div class="nav__item__label">
						<span>{item.album.name}</span>
						<span>{getArtistNames(item.album.artists)}</span>
					</div>
				</a>
			</li>
		{/each}
	</svelte:fragment>

	<slot />
</NavPage>
