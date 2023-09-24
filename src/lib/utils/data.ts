export async function getData<T>(endpoint: string, accessToken: string) {
	try {
		const res = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
			headers: { Authorization: `Bearer ${accessToken}` },
		});

		if (res.ok === false) {
			throw new Error("Failed to fetch data", {
				cause: res,
			});
		}

		const data = await res.json();

		return data as T;
	} catch (error) {
		console.error(error);
		return null;
	}
}
