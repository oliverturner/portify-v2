<script lang="ts">
	export let href: string;
	export let isActive: boolean;
</script>

<li>
	<a class="nav__item" class:nav__item--active={isActive} {href}>
		<slot name="label" />
	</a>
</li>

<style lang="postcss">
	.nav__item {
		display: grid;
		grid-gap: 0.5rem;

		transition: background 0.2s ease-in-out;

		padding: 1rem;
		font-size: 0.9rem;

		&.nav__item:hover:not(:active, .nav__item--active) {
			background: var(--brand-3);
		}

		&.nav__item:active,
		&.nav__item--active {
			background: var(--brand-2);
		}
	}
</style>
