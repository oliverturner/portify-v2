<script lang="ts">
	import type { PageData } from "./$types";

	import { getArtistNames } from "$lib/utils/artist";
	import { getAlbumItemProps } from "$lib/utils/album";

	import ContentItem from "$lib/components/content-item.svelte";

	export let data: PageData;

	$: savedAlbums = data.albums?.items ?? [];
</script>

<svelte:head>
	<title>Saved albums | Portify</title>
</svelte:head>

<div class="content">
	<h2 class="content__title">Saved albums</h2>
	<ol class="content__items content__items--tiled">
		{#each savedAlbums as { album } (album.id)}
			<ContentItem {...getAlbumItemProps(album)}>
				<svelte:fragment slot="title">
					<span>{album.name}</span>
					<span class="item__artists">{getArtistNames(album.artists)}</span>
				</svelte:fragment>
			</ContentItem>
		{/each}
	</ol>
</div>
