<script lang="ts">
	import { onMount } from "svelte";

	export let src: string = "/img/placeholder.svg";
	export let alt: string;
	export let square = true;

	let img: HTMLImageElement;
	let loaded = false;

	onMount(() => {
		loaded = img.complete;

		img.onload = () => {
			loaded = true;
		};
	});
</script>

{#key src}
	<img {src} {alt} class:square class:loaded loading="lazy" bind:this={img} />
{/key}
