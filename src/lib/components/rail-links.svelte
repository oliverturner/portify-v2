<script lang="ts">
	import Icon from "$lib/components/icon.svelte";

	export let links: { icon: string; href: string; label: string }[];
	export let isLinkActive: (href: string) => boolean;
</script>

<nav class="rail__links">
	{#each links as link}
		<a class="rail__link title" class:active={isLinkActive(link.href)} href={link.href}>
			<span class="rail__link__icon">
				<Icon id={link.icon} size="medium" />
			</span>
			<span class="rail__link__label">{link.label}</span>
		</a>
	{/each}
</nav>

<style lang="postcss">
	.rail__links {
		display: flex;
		justify-content: center;

		@media (min-width: 768px) {
			display: grid;
		}
	}

	.rail__link {
		--font-weight: 400;
		--padding: 0.5rem;

		flex: 1;

		display: grid;
		place-items: center;

		font-size: var(--font-size-0);
		line-height: 1;

		transition: background 0.2s ease-in-out;

		@media (min-width: 768px) {
			--padding: 0;

			aspect-ratio: 1;
			padding: var(--size-2);
		}

		&:hover,
		&:focus {
			outline: none;
			background: var(--brand-3);
		}
		&:active,
		&.active {
			background: var(--brand);
		}
	}

	.rail__link__icon {
		padding: var(--padding);
		padding-bottom: 0;
	}

	.rail__link__label {
		padding: var(--padding);
	}
</style>
