<script lang="ts">
	export let type: "artist" | "album" | "playlist" | "track";
	export let imgUrl: string | undefined;
	export let title: string | undefined;

	$: src = imgUrl ?? "/img/placeholder.svg";
</script>

<div class="topper cover--{type}">
	<figure class="cover">
		<img class="cover__art square" {src} alt="Cover art" loading="lazy" />
		<figcaption class="cover__label">
			<h2 class="title title--light">{title}</h2>
			<slot name="description" />
		</figcaption>
	</figure>
	<div class="content">
		<slot />
	</div>
</div>

<style lang="postcss">
	.topper {
		background: #0004;

		@media (min-width: 768px) {
			display: grid;
			gap: 1rem;
			grid-template-columns: 1fr auto;
		}
	}

	.cover {
		display: grid;
		align-items: end;
		gap: 1rem;

		margin: 0;

		@media (min-width: 768px) {
			grid-template-columns: 12rem 1fr;
		}
	}

	.cover__art {
		width: 12rem;
	}

	.cover__label {
		display: grid;
		gap: 1rem;

		padding: 0 1rem 1rem;

		@media (min-width: 768px) {
			padding: 1rem 0;
		}
	}
</style>
