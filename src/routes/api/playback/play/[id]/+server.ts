import { requestPlayback } from "$lib/server/api.js";
import { getSpotifyEndpoint } from "$lib/utils/data.js";

export async function GET({ params, locals }) {
	try {
		const endpoint = getSpotifyEndpoint("me/player/play");
		const options = {
			method: "PUT",
			body: JSON.stringify({ uris: [`spotify:track:${params.id}`] }),
		};
		const status = await requestPlayback(locals.auth, endpoint, options);

		return new Response(null, { status });
	} catch (error) {
		console.log(error);
	}
}
