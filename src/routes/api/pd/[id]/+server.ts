// GET, UPDATE, DELETE  A SPECIFIC PD
import { createHandlers } from '$lib/functions/specificHandle';

// export const PUT: RequestHandler = async ({ params, request }) => {
//     try {
//         let id = Number(params.id);
//         if(isNaN(id)) {
//             return json({ error: 'PUT: Invalid PD ID' }, { status: 400 });
//         }

//         let data = await request.json();

//         if(!data) {
//             return json({ error: 'PUT: PD Name is required' }, { status: 400});
//         }
        
//         let updated = await prisma.professionalDevelopment.update({
//             where: { id },
//             data: data
//         });
//         return json(updated);   
//     } catch(err) {
//         console.error('GET /api/professionalDevelopment/[id] error:', err);
//         return json({ error: 'Failed to update professionalDevelopment' }, {status : 500});
//     }
// }

export const { GET, PUT, DELETE } = createHandlers('professionalDevelopment', {
    logPrefix: 'pd',
    errorHandle: 'Professional Development'
})
