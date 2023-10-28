<script lang="ts">
	export let href: string;
	export let imgUrl: string | undefined;
</script>

<li>
	<a class="content__item" {href}>
		{#if imgUrl}
			<img class="content__item__cover square" src={imgUrl} alt="Cover art" loading="lazy" />
		{:else}
			<span class="nav__item__cover"></span>
		{/if}
		<span class="content__item__title">
			<slot name="title" />
		</span>
	</a>
</li>

<style lang="postcss">
	.content__item {
		display: grid;
		grid-template-columns: 1fr 5fr;
		grid-template-areas: "cover title";

		background: var(--surface-2);
		color: var(--text-1);

		@media (min-width: 768px) {
			grid-template-columns: initial;
			grid-template-areas: initial;

			aspect-ratio: 1;
			& > * {
				grid-area: 1 / 1 / -1 / -1;
			}
		}
	}

	.content__item__title {
		align-self: center;

		padding: 0.5rem 1rem;

		@media (min-width: 768px) {
			align-self: end;

			display: grid;
			gap: 0.35rem;

			/**
			* Opacity creates a stacking context, so `position: relative` here prevents
			* the title bar of tiled items from being overlayed by the thumbnail as it
			* fades up on load
			*/
			position: relative;
			padding: 0.5rem;
			background: var(--surface-1);
		}
	}
</style>
