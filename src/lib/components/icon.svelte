<script lang="ts">
	export let id:string;
</script>

<svg>
	<use xlink:href="/icons.svg#icon-{id}"></use>
</svg>

<style>
	svg {
		width: 2rem;
    aspect-ratio: 1;
    stroke: currentColor;
	}
</style>
