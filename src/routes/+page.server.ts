import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ parent }) => {
    let { user, programs, training } = await parent();

    if(user && user.roleId === 3) {
        throw redirect (302, '/manage');
    }

    return { programs, training } 
}
