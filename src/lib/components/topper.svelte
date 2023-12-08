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

		margin: 0;
		background: #0004;

		@media (min-width: 768px) {
			display: grid;
			grid-template-columns: 12rem 1fr;
			grid-template-areas: "cover content";
			align-items: end;
		}
	}

	.topper__cover {
		grid-area: cover;

		display: grid;
		justify-content: center;

		& img {
			max-width: var(--wh);
		}
	}

	.topper__content {
		grid-area: content;

		display: grid;

		position: relative;
		padding: 1rem;
		background: var(--surface-1);

		@media (min-width: 768px) {
			background: none;
		}
	}
</style>
