import { addToast } from "$lib/components/toaster.svelte";

export async function playTrack(trackId: string) {
	const endpoint = `/api/playback/play/${trackId}`;
	const { status } = await fetch(endpoint);

	if (status === 404) {
		addToast({
			data: {
				title: "Heads up!",
				description: "To listen, Spotify Connect needs the Spotify app to be playing",
				color: "bg-red-500",
			},
		});
	}
}
