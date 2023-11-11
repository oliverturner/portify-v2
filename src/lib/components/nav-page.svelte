<script lang="ts">
	import { pageNav } from "$lib/stores/ui";
	import { onMount } from "svelte";

	let navScrollRoot: HTMLElement;
	let navScrollSentinel: HTMLElement;

	export let onNavScrollEnd = () => {
		console.log("loadAdditionalItems called without override");
	};

	export let onNavScroll = (entries: IntersectionObserverEntry[]) => {
		const entry = entries[0];
		if (entry.isIntersecting) {
			onNavScrollEnd();
		}
	};

	onMount(() => {
		let observer = new IntersectionObserver(onNavScroll, {
			root: navScrollRoot,
			rootMargin: "0px",
			threshold: 1.0,
		});

		observer.observe(navScrollSentinel);
	});
</script>

<div class="page">
	<div class="page__nav" class:displayed={$pageNav} bind:this={navScrollRoot}>
		<ol class="page__nav__items">
			<slot name="nav-items" />
			<li bind:this={navScrollSentinel}></li>
		</ol>
	</div>
	<div class="page__content">
		<slot />
	</div>
</div>

<style lang="postcss">
	.page {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-areas: "content";

		position: relative;
		height: 100%;
		overflow: hidden;
		z-index: 2;

		@media (min-width: 1024px) {
			grid-template-columns: 260px 1fr;
			grid-template-areas: "nav content";
		}
	}

	:is(.page__nav, .page__content) {
		overflow: hidden auto;
		scrollbar-gutter: stable;
	}

	.page__nav {
		--_translate-x: -100%;
		--_width: min(calc(100dvw - 92px), 300px);
		--_height: 100%;
		--_bg: var(--surface-0);

		position: fixed;
		top: 0;
		left: 0;
		width: var(--_width);
		height: var(--_height);
		background: var(--_bg);
		z-index: 2;

		transform: translate3D(var(--_translate-x), 0, 0);
		transition: transform 0.25s ease-in-out;

		@media (min-width: 1024px) {
			--_width: initial;
			--_height: initial;
			--_bg: var(--surface-5);

			grid-area: nav;

			position: static;
			transform: none;
			z-index: initial;
		}

		&.displayed {
			--_translate-x: 0;

			@media (min-width: 768px) {
				--_height: calc(100dvh - 50px);
				--_translate-x: 92px;
			}
		}
	}

	.page__content {
		grid-area: content;

		position: relative;
		z-index: 1;
	}
</style>
