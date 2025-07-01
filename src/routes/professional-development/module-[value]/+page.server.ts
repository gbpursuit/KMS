import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url, parent, fetch }) => {
    let { user, name, selectedItem, training } = await parent();
    
    return { user, name, selectedItem, training };
};
