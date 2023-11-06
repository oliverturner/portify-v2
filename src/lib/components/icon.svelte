<script lang="ts">
	export let id: string;
	export let size: "small" | "medium" | "large" | "auto" = "small";
</script>

<svg class={size}>
	<use xlink:href="#{id}"></use>
</svg>

<style lang="postcss">
	svg {
		--wh: 100%;

		width: var(--wh);
		height: var(--wh);
		aspect-ratio: 1;
		stroke: currentColor;

		&.small {
			--wh: 1.5rem;
		}
		&.medium {
			--wh: 2rem;
		}
		&.large {
			--wh: 2.5rem;
		}
	}
</style>
