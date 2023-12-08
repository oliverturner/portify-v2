<script lang="ts">
	import Image from "./image.svelte";

	export let type: "artist" | "album" | "playlist" | "track";
	export let imgUrl: string | undefined = undefined;

	const src = imgUrl ?? "/img/placeholder.svg";
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
		/* --topperAlignItems: center; */
		--topperAlignItems: stretch;

		margin: 0;
		background: #0004;

		@media (min-width: 768px) {
			display: grid;
			grid-template-columns: 12rem 1fr;
			grid-template-areas: "cover content";
			align-items: var(--topperAlignItems);
		}
	}

	.topper__cover {
		grid-area: cover;

		& figure {
			aspect-ratio: initial;
			width: 100%;
			height: 100%;
		}

		& .subject {
			display: block;
		}
	}

	.topper__content {
		grid-area: content;

		display: grid;
		align-items: center;

		position: relative;
		padding: 1rem;
		background: var(--surface-1);

		@media (min-width: 768px) {
			background: none;
		}
	}
</style>
