<script lang="ts">
	import type { LayoutData } from "./$types";

	export let data: LayoutData;
</script>

<div class="page">
	<ul class="page__nav">
		{#each data.albums?.items ?? [] as item}
			<li>
				<a href="/app/albums/{item.album.id}">{item.album.name}</a>
			</li>
		{/each}
	</ul>
	<div class="page__content">
		<slot />
	</div>
</div>
