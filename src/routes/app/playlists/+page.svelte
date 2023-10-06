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
