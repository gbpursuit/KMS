// Runs First (per page request)

import type { Handle } from '@sveltejs/kit';
import { getUserFromCookie } from '$lib/functions/auth';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.user = await getUserFromCookie(event.cookies);
	return resolve(event);
};