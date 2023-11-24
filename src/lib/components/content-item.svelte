<script lang="ts">
	import Image from "./image.svelte";

	export let href: string;
	export let imgUrl: string | undefined = undefined;
</script>

<li>
	<a class="content__item" {href}>
		{#if imgUrl}
			<Image src={imgUrl} alt="Cover art" />
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
		grid-template-columns: 2fr 5fr;
		grid-template-areas: "cover title";
		align-items: center;

		height: 100%;
		background: var(--surface-5);
		color: var(--text-1);
	}

	.content__item__title {
		display: grid;
		gap: 0.35rem;

		padding: 0.5rem 1rem;
	}
</style>
