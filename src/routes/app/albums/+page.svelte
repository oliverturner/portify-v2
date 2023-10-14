<script lang="ts">
	import type { Album } from "$lib/typings/spotify";
	import type { PageData } from "./$types";

	import { getArtistNames } from "$lib/utils/data";
	import ContentItem from "$lib/components/content-item.svelte";

	export let data: PageData;

	const getItemProps = (album: Album) => ({
		href: `/app/albums/${album.id}`,
		imgUrl: album.images.at(0)?.url,
	});

	$: savedAlbums = data.albums?.items ?? [];
</script>

<div class="content">
	<ol class="content__items content__items--tiled">
		{#each savedAlbums as { album } (album.id)}
			<ContentItem {...getItemProps(album)}>
				<svelte:fragment slot="title">
					<span>{album.name}</span>
					<span class="item__artists">{getArtistNames(album.artists)}</span>
				</svelte:fragment>
			</ContentItem>
		{/each}
	</ol>
</div>
