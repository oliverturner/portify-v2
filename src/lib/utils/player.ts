import { addToast } from "$lib/components/toaster.svelte";

export async function playTrack(id: string) {
	return fetch(`/api/playback/play/${id}`);
}

export async function onPlayBtnClick(trackId: string) {
	const { status } = await playTrack(trackId);

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
