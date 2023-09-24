import { auth, spotifyAuth } from "$lib/server/lucia.js";
import { OAuthRequestError } from "@lucia-auth/oauth";

export const GET = async ({ url, cookies, locals }) => {
	const session = await locals.auth.validate();
	if (session) {
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/app",
			},
		});
	}

	const storedState = cookies.get("spotify_oauth_state");
	const state = url.searchParams.get("state");
	const code = url.searchParams.get("code");
	// validate state
	if (!storedState || !state || storedState !== state || !code) {
		return new Response(null, {
			status: 400,
		});
	}

	try {
		const { getExistingUser, spotifyUser, createUser, spotifyTokens } =
			await spotifyAuth.validateCallback(code);

		const getUser = async () => {
			const existingUser = await getExistingUser();
			if (existingUser) return existingUser;

			const user = await createUser({
				attributes: {
					username: spotifyUser.display_name!,
					access_token: spotifyTokens.accessToken,
					refresh_token: spotifyTokens.refreshToken,
				},
			});

			return user;
		};

		const user = await getUser();
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {},
		});
		locals.auth.setSession(session);

		return new Response(null, {
			status: 302,
			headers: {
				Location: "/app",
			},
		});
	} catch (e) {
		if (e instanceof OAuthRequestError) {
			// invalid code
			return new Response(null, {
				status: 400,
			});
		}
		return new Response(null, {
			status: 500,
		});
	}
};
