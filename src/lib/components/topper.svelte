<script lang="ts">
	export let type: "artist" | "album" | "playlist" | "track";
	export let imgUrl: string | undefined;

	$: src = imgUrl ?? "/img/placeholder.svg";
</script>

<div class="topper class:{type}">
	<div class="cover">
		<slot name="cover">
			<img class="cover__art square" {src} alt="Cover art" loading="lazy" />
		</slot>
	</div>

	<div class="content">
		<slot />
	</div>
</div>

<style lang="postcss">
	.topper {
		--wh: 12rem;

		display: grid;
		align-items: end;
		gap: 1rem;

		margin: 0;
		background: #0004;

		@media (min-width: 768px) {
			grid-template-columns: 12rem 1fr;
			grid-template-areas: "cover content";
		}
	}

	.cover {
		grid-area: cover;
	}

	.content {
		grid-area: content;
	}
</style>
