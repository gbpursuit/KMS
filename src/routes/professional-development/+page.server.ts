import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ parent }) => {
    let { programId, name, pd, training } = await parent();

    return { programId, name, pd, training } 
}
