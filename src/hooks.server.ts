// Runs First (per page request)

import type { Handle } from '@sveltejs/kit';
import { getUserFromCookie } from '$lib/functions/auth';

export const handle: Handle = async ({ event, resolve }) => {
	// const session = event.cookies.get('session');
	// console.log('Session cookie in hook:', session);

	event.locals.user = await getUserFromCookie(event.cookies);
	return resolve(event);
};