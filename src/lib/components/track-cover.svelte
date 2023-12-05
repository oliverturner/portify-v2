<script lang="ts">
	import type { AudioTrack } from "$lib/typings/app";

	import { keyNotation } from "$lib/stores/prefs";

	export let track: AudioTrack;
	export let compact: boolean = false;
</script>

<figure class:compact>
	<div class="subject" class:compact>
		<slot />
	</div>

	{#if track.audio}
		<figcaption class="meta">
			<button
				class="meta__key"
				style="--bg: oklch({track.audio.oklch})"
				on:click={keyNotation.toggle}
			>
				<span>
					{track.audio.keys[$keyNotation]}
				</span>
			</button>
			<p class="meta__bpm" class:compact>{track.audio.tempo} <span>bpm</span></p>
		</figcaption>
	{/if}
</figure>

<style lang="postcss">
	figure {
		grid-area: cover;

		display: grid;
		grid-template-rows: 1fr auto;
		grid-template-areas:
			"btn"
			"meta";

		width: var(--wh, 10rem);
		height: var(--wh, 10rem);
		background: var(--surface-5);

		&.compact {
			height: 100%;
		}
	}

	.subject {
		grid-area: 1 / 1 / -1 / -1;

		display: grid;
		place-content: center;

		font-size: 2.5rem;
		font-weight: 100;

		&.compact {
			grid-area: btn;

			padding-block: 1rem;
		}
	}

	.meta {
		grid-area: meta;

		display: flex;
		justify-content: space-between;
		align-items: center;

		position: relative;
		padding: 0.5rem;
		padding-right: 0;

		& > * {
			flex: 0 1 auto;

			line-height: 1;
			font-size: small;
		}
	}

	.meta__key {
		padding: 0.75ch;
		border: none;
		white-space: nowrap;
		text-shadow: none;
		background-color: var(--bg);
		color: #000;
	}

	.meta__bpm {
		padding: 0.5rem;
		border: 1px solid var(--border-2);
		border-right: none;
		border-radius: 0.5rem 0 0 0.5rem;
		background: var(--surface-2);

		& > span {
			font-variant: small-caps;
		}

		&.compact {
			border: none;
		}
	}
</style>
