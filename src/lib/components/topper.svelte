<script lang="ts">
	import Image from "./image.svelte";

	export let type: "artist" | "album" | "playlist" | "track";
	export let imgUrl: string | undefined = undefined;

	$: src = imgUrl ?? "/img/placeholder.svg";
</script>

<div class="topper class:{type}">
	<div class="topper__cover">
		<slot name="cover">
			<Image {src} alt="Cover art" />
		</slot>
	</div>

	<div class="topper__content">
		<slot />
	</div>
</div>

<style lang="postcss">
	.topper {
		--wh: 12rem;

		display: grid;
		align-items: end;
		grid-template-areas:
			"cover"
			"content";

		margin: 0;
		background: var(--surface-5);

		@media (min-width: 768px) {
			gap: 1rem;
			grid-template-columns: 12rem 1fr;
			grid-template-areas: "cover content";
		}
	}

	.topper__cover {
		grid-area: cover;

		display: flex;
		justify-content: center;
	}

	.topper__content {
		grid-area: content;
		padding: 1rem;

		@media (min-width: 768px) {
			background: none;
		}
	}
</style>
