<script lang="ts" context="module">
	export type ToastData = {
		title: string;
		description: string;
		color: string;
	};

	const {
		elements: { content, title, description },
		helpers,
		states: { toasts },
		actions: { portal },
	} = createToaster<ToastData>();

	export const addToast = helpers.addToast;
</script>

<script lang="ts">
	import { createToaster, melt } from "@melt-ui/svelte";
	import { flip } from "svelte/animate";
	import { fly } from "svelte/transition";
</script>

<div class="toaster" use:portal>
	{#each $toasts as { id, data } (id)}
		<div
			class="toast"
			use:melt={$content(id)}
			animate:flip={{ duration: 500 }}
			in:fly={{ duration: 150, y: "100%" }}
			out:fly={{ duration: 150, y: "100%" }}
		>
			<div class="toast__content">
				<h3 use:melt={$title(id)}>
					{data.title}
				</h3>
				<div use:melt={$description(id)}>
					{data.description}
				</div>
			</div>
		</div>
	{/each}
</div>

<style lang="postcss">
	.toaster {
		display: grid;
		align-items: end;
		gap: 0.5rem;

		position: fixed;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		margin: 1rem;
		z-index: 3;
	}

	.toast {
		box-shadow: var(--shadow-md);
		background: var(--surface-0);
	}

	.toast__content {
		position: relative;

		display: grid;
		gap: 1rem;

		width: content;
		max-width: calc(100vw - 2rem);
		padding: 1.6rem;
	}
</style>
