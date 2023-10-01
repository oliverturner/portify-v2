<script lang="ts">
	export let id: string;
	export let size: "small" | "medium" | "large" = "medium";
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
			width: 1rem;
		}
		&.medium {
			width: 1.5rem;
		}
		&.large {
			width: 2.5rem;
		}
	}
</style>
