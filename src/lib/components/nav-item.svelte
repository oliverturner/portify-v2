<script lang="ts">
	export let href: string;
	export let isActive: boolean;
	export let imgUrl: string | undefined;
</script>

<li>
	<a class="nav__item" class:nav__item--active={isActive} {href}>
		{#if imgUrl}
			<img class="nav__item__cover" src={imgUrl} alt="Cover art" />
		{:else}
			<span class="nav__item__cover"></span>
		{/if}
		<div class="nav__item__label">
			<slot name="label" />
		</div>
	</a>
</li>

<style lang="postcss">
	.nav__item {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-areas: "cover label";
		grid-gap: 0.5rem;
		align-items: center;

		line-height: 1;
		background: rgba(var(--color-secondary-600) / 0.1);
		background: rgb(var(--color-surface-600) / 0.2);
	}

	.nav__item__cover {
		grid-area: cover;
		width: 64px;
		aspect-ratio: 1;
		object-fit: cover;
	}

	.nav__item__label {
		grid-area: label;

		line-height: 1.5;
		font-size: 0.9rem;
	}
</style>
