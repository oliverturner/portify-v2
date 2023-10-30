<script lang="ts">
	export let src: string | undefined = "";
	export let alt: string;
	export let square = true;

	let loaded = false;

	const onImageLoaded = () => (loaded = true);
</script>

<img {src} {alt} class:square class:loaded loading="lazy" on:load={onImageLoaded} />

<style lang="postcss">
	img {
		opacity: 0;
		transition: 0.25s opacity 0.75s ease-out;

		&.loaded {
			opacity: 1;
		}
	}
</style>
