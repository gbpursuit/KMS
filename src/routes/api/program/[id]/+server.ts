// GET, UPDATE, DELETE A SPECIFIC PROGRAM
import { createHandlers } from '$lib/functions/specificHandle';

export const { GET, PUT, DELETE } = createHandlers('program', {
    include: {pd: true},
    logPrefix: 'program'
})

// export const PUT: RequestHandler = async ({ params, request }) => {
//     try {
//         let id = Number(params.id);
//         if(isNaN(id)) {
//             return json({ error: 'PUT: Invalid Program ID' }, { status: 400 });
//         }

//         let { name } = await request.json();

//         if(!name || typeof name !== 'string') {
//             return json({ error: 'PUT: Program Name is required' }, { status: 400});
//         }
        
//         let updated = await prisma.program.update({
//             where: { id },
//             data: { name }
//         });
//         return json(updated);   
//     } catch(err) {
//         console.error('GET /api/program/[id] error:', err);
//         return json({ error: 'Failed to update program' }, {status : 500});
//     }
// }


