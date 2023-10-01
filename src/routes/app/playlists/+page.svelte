<script lang="ts">
	import type { LayoutData } from "./$types";

	export let data: LayoutData;
</script>

<div class="content">
	<ul class="content__items grid">
		{#each data.playlists?.items ?? [] as item}
			<li>
				<a class="content__item grid square" href="/app/playlists/{item.id}">
					<img class="content__item__cover" src={item.images.at(0)?.url} alt="Cover art" />
					<span class="content__item__title">{item.name}</span>
				</a>
			</li>
		{/each}
	</ul>
</div>

<style>
	.content__items {
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	}
	:is(.content__item__cover, .content__item__title) {
		grid-area: 1 / 1 / -1 / -1;
	}

	.content__item__cover {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.content__item__title {
		align-self: end;

		padding: 0.5rem;
		font-size: 0.8rem;
		background: #000b;
	}
</style>
