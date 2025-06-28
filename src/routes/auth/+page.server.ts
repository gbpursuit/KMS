// This is called first before +page.svelte is rendered
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url, parent, fetch }) => {
    let { user } = await parent();
    let id = url.searchParams.get('content');
    let view = url.searchParams.get('view');

    if(user) {
        if (user.roleId === 3) {
            throw redirect(302, '/manage');
        }
        else if (id && /^\d+$/.test(id)) {
            throw redirect(302, `/program-${id}`);
        } else {
            throw redirect(302, '/');
        }
    }
    return { id, view };
};
