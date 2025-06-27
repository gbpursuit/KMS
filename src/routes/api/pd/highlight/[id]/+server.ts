// GET, UPDATE, DELETE A SPECIFIC HIGHLIGHT
import { createHandlers } from '$lib/functions/specificHandle';

// export const PUT: RequestHandler = async ({ params, request }) => {
//     let id = Number(params.id);
//     if(isNaN(id)) {
//         return json({ error: 'PUT: Invalid Participant ID' }, { status: 400 });
//     }

//     try {   
//         let data = await request.json();

//         if(!data) {
//             return json({ error: 'PUT: Highlight Data is required' }, { status: 400 });
//         }

//         let updated = await prisma.highlight.update({
//             where: { id },
//             data: data
//         });
//         return json(updated); 
//     } catch (err) {
//         console.error('GET /api/highlight/[id] error:', err);
//         return json({ error: 'Failed to update highlight' }, {status : 500});
//     }
// };

export const { GET, PUT, DELETE } = createHandlers('highlight', {
    logPrefix: 'highlight',
    errorHandle: 'Highlight'
})