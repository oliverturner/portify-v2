import type { Actions } from "@sveltejs/kit";

import { fail, redirect } from "@sveltejs/kit";

import { auth } from "$lib/server/lucia";

export const actions: Actions = {
	logout: async ({ locals }) => {
		const session = await locals.auth?.validate();

		if (!session) return fail(401);

		// invalidate session
		await auth.invalidateSession(session.sessionId);

		// remove cookie
		locals.auth.setSession(null);

		// redirect to login page
		throw redirect(302, "/");
	},
};
