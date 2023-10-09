<script lang="ts">
	import type { SavedAlbum } from "$lib/typings/spotify";
	import type { LayoutData } from "./$types";

	import { getArtistNames } from "$lib/utils/data";
	import ContentItem from "$lib/components/content-item.svelte";

	export let data: LayoutData;

	const getItemProps = (item: SavedAlbum) => ({
		href: `/app/albums/${item.album.id}`,
		imgUrl: item.album.images.at(0)?.url,
	});
</script>

<h2>Albums</h2>

<div class="content">
	<ol class="content__items">
		{#each data.albums?.items ?? [] as item (item.album.id)}
			<ContentItem {...getItemProps(item)}>
				<svelte:fragment slot="title">
					<span>{item.album.name}</span>
					<span>{getArtistNames(item.album.artists)}</span>
				</svelte:fragment>
			</ContentItem>
		{/each}
	</ol>
</div>
