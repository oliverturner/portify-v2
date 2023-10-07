<script lang="ts">
	import type { LayoutData } from "./$types";

	import { getArtistNames } from "$lib/utils/data";

	export let data: LayoutData;
</script>

<h2>Albums</h2>

<div class="content">
	<ol class="content__items">
		{#each data.albums?.items ?? [] as item}
			<li>
				<a class="content__item grid square" href="/app/playlists/{item.album.id}">
					<img class="content__item__cover" src={item.album.images.at(0)?.url} alt="Cover art" />
					<span class="content__item__title">
						<span>{item.album.name}</span>
						<span>{getArtistNames(item.album.artists)}</span>
					</span>
				</a>
			</li>
		{/each}
	</ol>
</div>
