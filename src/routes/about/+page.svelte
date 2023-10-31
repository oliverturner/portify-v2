<script lang="ts">
	import { getTrackKey } from "$lib/utils/track";

	const tempo = 0;
	const arr = Array.from({ length: 12 }, (_, key) => {
		const minor = getTrackKey("camelot", { mode: 0, key, tempo });
		const major = getTrackKey("camelot", { mode: 1, key, tempo });
		return [minor, major];
	});
</script>

<ul>
	{#each arr as [major, minor]}
		<li style="--bg:{major.hsl}"><span>{major.key}</span></li>
		<li style="--bg:{minor.hsl}"><span>{minor.key}</span></li>
	{/each}
</ul>

<style>
	li {
		padding: 1rem;
    text-align: center;
		background-color: var(--bg);
	}

  span {
    mix-blend-mode: difference;
  }
</style>
