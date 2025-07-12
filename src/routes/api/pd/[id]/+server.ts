// // GET, UPDATE, DELETE  A SPECIFIC PD
import { createHandlers } from '$lib/functions/specificHandle';

// export const { GET, PUT, DELETE } = createHandlers('professionalDevelopment', {
//     logPrefix: 'pd',
//     errorHandle: 'Professional Development'

// })

import type { RequestHandler } from '@sveltejs/kit';
import { data } from '$lib/functions/prisma'; 
import { error } from '@sveltejs/kit';

export const { GET, DELETE } = createHandlers('professionalDevelopment', {
    logPrefix: 'pd',
    errorHandle: 'Professional Development'
})

export const PUT: RequestHandler = async({ params, request }) => {
    let id = Number(params.id);
    if(isNaN(id)) {
        throw error(400, 'Invalid Module ID. Update Failed.');
    }

    try {
        let item = await request.json();
        if(!item) {
            throw error(400, 'PUT: JSON data is missing');
        }

        let updated = await data.PRISMA.professionalDevelopment.update({
            where: { id },
            data: item
        });

        return data.json(updated);

    } catch (err: any) {
        console.error('POST /api/pd error', err);
        if(err?.status) throw err;
        throw error(500, err?.message || 'Failed to update JSON Content');
    }
}

