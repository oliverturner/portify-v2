<script lang="ts">
	import { onLoad } from "$lib/utils/image";

	export let href: string;
	export let imgUrl: string | undefined;
</script>

<li>
	<a class="content__item" {href}>
		{#if imgUrl}
			<img class="content__item__cover square" src={imgUrl} alt="Cover art" on:load={onLoad} />
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

		& > * {
			grid-area: 1 / 1 / -1 / -1;
		}
	}
</style>
