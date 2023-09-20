export async function getData(endpoint: string, accessToken: string) {
	const res = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
		headers: { Authorization: `Bearer ${accessToken}` },
	});

	const data = await res.json();

	return data;
}
