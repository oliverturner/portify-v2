<script lang="ts">
	import { onLoad } from "$lib/utils/image";

	export let href: string;
	export let imgUrl: string | undefined;
</script>

<li>
	<a class="content__item" {href}>
		{#if imgUrl}
			<img class="content__item__cover" src={imgUrl} alt="Cover art" on:load={onLoad} />
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

		aspect-ratio: 1;

		background: var(--surface-2);
	}

	:is(.content__item__cover, .content__item__title) {
		grid-area: 1 / 1 / -1 / -1;
	}

	.content__item__cover {
		width: 100%;
		height: 100%;
		overflow: hidden;
		object-fit: cover;
		background: var(--surface-2);
	}

	.content__item__title {
		--_bg: var(--surface-1);
		--_ink: var(--text-1);

		align-self: end;

		display: grid;
		gap: 0.35rem;

		position: relative;
		padding: 0.5rem;
		font-size: 0.8rem;
		background: var(--_bg);
		color: var(--_ink);
	}
</style>
