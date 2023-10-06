<script lang="ts">
	import type { LayoutData } from "./$types";

	export let data: LayoutData;
</script>

<h2>Artists</h2>

<div class="content">
	<ol class="content__items">
		{#each data.artists?.items ?? [] as item}
			<li>
				<a class="content__item grid square" href="/app/artists/{item.id}">
					<img class="content__item__cover square" src={item.images.at(0)?.url} alt="Cover art" />
					<span class="content__item__title">
						<span>{item.name}</span>
					</span>
				</a>
			</li>
		{/each}
	</ol>
</div>
