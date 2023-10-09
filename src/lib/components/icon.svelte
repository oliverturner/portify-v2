<script lang="ts">
	export let id: string;
	export let size: "small" | "medium" | "large" = "small";
</script>

<svg class={size}>
	<use xlink:href="/icons.svg#icon-{id}"></use>
</svg>

<style lang="postcss">
	svg {
		width: 100%;
		aspect-ratio: 1;
		stroke: currentColor;

		&.small {
			width: 1.5rem;
		}
		&.medium {
			width: 2rem;
		}
		&.large {
			width: 2.5rem;
		}
	}
</style>
