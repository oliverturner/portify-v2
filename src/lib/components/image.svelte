<script lang="ts">
	export let src: string | undefined = "";
	export let alt: string;
	export let square = true;

	let loaded = false;

	/**
	 * If the load event hasn't fired after 2 seconds, fade it up anyway.
	 */
	const timeOut = setTimeout(() => {
		loaded = true;
	}, 2000);

	const onImageLoaded = () => {
		clearTimeout(timeOut);
		loaded = true;
	};
</script>

<img {src} {alt} class:square class:loaded on:load={onImageLoaded} loading="lazy" />

<style lang="postcss">
	img {
		opacity: 0;
		transition: 0.25s opacity 0.75s ease-out;

		&.loaded {
			opacity: 1;
		}
	}
</style>
