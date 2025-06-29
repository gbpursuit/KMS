// This is called first before +page.svelte is rendered
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url, parent, fetch }) => {
    let { user } = await parent();

    if(user && user.roleId !== 3) {
        throw error (401, 'Unauthorized');
    }
};
