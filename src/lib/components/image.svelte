<script lang="ts">
	export let src: string | undefined = "";
	export let alt: string;
	export let square = true;

	const onImageLoaded = () => {
		clearTimeout(timeOut);
		loaded = true;
	};

	$: loaded = false;
	$: timeOut = setTimeout(() => (loaded = true), 2000);
</script>

<img {src} {alt} class:square class:loaded on:load={onImageLoaded} loading="lazy" />

<style lang="postcss">
	img {
		opacity: 0;
		transition: opacity 1s;

		&.loaded {
			opacity: 1;
		}
	}
</style>
