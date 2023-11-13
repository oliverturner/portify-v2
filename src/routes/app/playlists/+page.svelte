<script lang="ts">
	import type { Playlist, TrackItem } from "$lib/typings/spotify";

	import ContentItem from "$lib/components/content-item.svelte";

	import { playlists } from "./store";

	const getItemProps = (item: Playlist<TrackItem>) => ({
		href: `/app/playlists/${item.id}`,
		imgUrl: item.images.at(0)?.url,
	});
</script>

<svelte:head>
	<title>Playlists | Portify</title>
</svelte:head>

<div class="content">
	<h3 class="content__title">Playlists</h3>
	<ul class="content__items content__items--tiled">
		{#each $playlists.items ?? [] as item (item.id)}
			<ContentItem {...getItemProps(item)}>
				<span slot="title">{item.name}</span>
			</ContentItem>
		{/each}
	</ul>
</div>
