<script lang="ts">
	import type { Playlist, TrackItem } from "$lib/typings/spotify";
	import type { LayoutData } from "./$types";

	import ContentItem from "$lib/components/content-item.svelte";

	export let data: LayoutData;

	const getItemProps = (item: Playlist<TrackItem>) => ({
		href: `/app/playlists/${item.id}`,
		imgUrl: item.images.at(0)?.url,
	});
</script>

<div class="content">
	<ul class="content__items content__items--tiled">
		{#each data.playlists?.items ?? [] as item (item.id)}
			<ContentItem {...getItemProps(item)}>
				<span slot="title">{item.name}</span>
			</ContentItem>
		{/each}
	</ul>
</div>
