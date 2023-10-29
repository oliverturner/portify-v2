<script lang="ts">
	import type { SimplifiedTrack, Track } from "$lib/typings/spotify";
	import type { TrackMetadata } from "$lib/typings/app";

	import { playTrack } from "$lib/utils/player";
	import { getTrackKey } from "$lib/utils/track";
	import { keyNotation } from "$lib/stores/prefs";

	import Icon from "./icon.svelte";

	export let track: Track | SimplifiedTrack;
	export let metadata = {} as TrackMetadata;
	export let compact: boolean = false;

	$: trackKey = getTrackKey($keyNotation, metadata) ?? "N/A";
	$: tempo = metadata.tempo ?? "N/A";
</script>

<figure>
	<div class="subject" class:compact>
		<slot />
	</div>

	<a class="playbtn" href={track.href} on:click|preventDefault={() => playTrack(track.id)}>
		<Icon id="icon-play" />
		<span class="sr-only">Play</span>
	</a>

	<figcaption class="meta">
		<p class="meta__key">
			<button style="--bg: {trackKey.hsl}" on:click={keyNotation.toggle}>
				<span>
					{trackKey.key}
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
	}

	.subject {
		grid-area: 1 / 1 / -1 / -1;

		display: grid;
		place-content: center;

		&.compact {
			grid-area: btn;
		}
	}

	.playbtn {
		grid-area: btn;
	}

	.meta {
		grid-area: meta;

		display: flex;
		align-items: center;

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
			background-color: var(--bg);
		}

		& span {
			mix-blend-mode: difference;
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
