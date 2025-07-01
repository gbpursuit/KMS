// This is called first before +page.svelte is rendered
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url, parent, fetch }) => {
	let idParam = url.searchParams.get('content');
	let view = url.searchParams.get('view');

	let id: number | null = null;
	if (idParam && /^\d+$/.test(idParam)) {
		id = parseInt(idParam);
	}

	return {
		path: id !== null ? switchCase(id) : '/',
		view
	};
};

function switchCase(id: number) {
    let path: Record<number, string> = {
        1: '/research',
        2: '/curriculum-development',
        3: '/professional-development',
        4: '/extension'
    };

    return path[id] ?? '/';
}