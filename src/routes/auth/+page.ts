// This is called first before +page.svelte is rendered
import type { PageLoad } from './$types';
import { redirect, error } from '@sveltejs/kit';
import { getData } from '$lib/functions/database';

export const load: PageLoad = async ({ url, parent, fetch }) => {
	let { user } = await parent();
	let id = url.searchParams.get('content');
	let view = url.searchParams.get('view');

	if(user) {
		if (id && /^\d+$/.test(id)) {
			throw redirect(302, `/program-${id}`);
		} else {
			throw redirect(302, '/');
		}
	}


	return { id, view };
};
