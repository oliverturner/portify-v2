<script lang="ts">
	import Image from "./image.svelte";

	export let type: "artist" | "album" | "playlist" | "track";
	export let imgUrl: string | undefined = undefined;

	$: src = imgUrl ?? "/img/placeholder.svg";
</script>

<div class="topper class:{type}">
	<div class="cover">
		<slot name="cover">
			<Image {src} alt="Cover art" />
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

		margin: 0;
		background: #0004;

		@media (min-width: 768px) {
			gap: 1rem;
			grid-template-columns: 12rem 1fr;
			grid-template-areas: "cover content";
		}
	}

	.cover {
		grid-area: cover;
	}

	.content {
		grid-area: content;

		position: relative;
		background: var(--surface-1);

		@media (min-width: 768px) {
			background: none;
		}
	}
</style>
