// This is called first before +page.svelte is rendered
import type { PageLoad } from './$types';
import { redirect, error } from '@sveltejs/kit';
import { getData } from '$lib/functions/database';

export const load: PageLoad = async ({ url, parent, fetch }) => {
	let { user } = await parent();
	let id = url.searchParams.get('content');

	console.log('User', user);

	if(user) {
		throw redirect(302, `/modules-${id ?? ''}`)
	}

	if(id) {
		let program = await getData(`program/${id}`, fetch);
		if(!program) {
			throw error (400, 'Invalid Program');
		}
	}

	return { id };
};
