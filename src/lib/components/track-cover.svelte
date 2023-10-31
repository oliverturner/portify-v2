<script lang="ts">
	import type { TrackMetadata } from "$lib/typings/app";

	import { getTrackAudio } from "$lib/utils/track";
	import { keyNotation } from "$lib/stores/prefs";

	export let metadata = {} as TrackMetadata;
	export let compact: boolean = false;

	$: trackKey = getTrackAudio(metadata) ?? {};
	$: tempo = metadata.tempo ?? "N/A";
</script>

<figure class:compact>
	<div class="subject" class:compact>
		<slot />
	</div>

	<figcaption class="meta">
		<p class="meta__key">
			<button style="--bg: oklch({trackKey.oklch})" on:click={keyNotation.toggle}>
				<span>
					{trackKey.keys[$keyNotation]}
				</span>
			</button>
		</p>
		<p class="meta__bpm" class:compact>{tempo} <span>bpm</span></p>
	</figcaption>
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
		}
	}

	.meta {
		grid-area: meta;

		display: flex;
		align-items: center;

		position: relative;

		& > * {
			padding: 0.5rem;
		}
	}

	.meta__key {
		flex: 1;

		& > button {
			padding: 0.75ch;
			border: none;
			white-space: nowrap;
			font-weight: 400;
			text-shadow: none;
			background-color: var(--bg);
			color: #000;
		}
	}

	.meta__bpm {
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
