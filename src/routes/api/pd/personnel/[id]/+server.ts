// GET, UPDATE, DELETE A SPECIFIC PERSONNEL
import { createHandlers } from '$lib/functions/specificHandle';

// export const PUT: RequestHandler = async ({ params, request }) => {
//     try {
//         let id = Number(params.id);
//         if(isNaN(id)) {
//             return json({ error: 'PUT: Invalid Personnel ID' }, { status: 400 });
//         }

//         let data = await request.json();

//         if(!data) {
//             return json({ error: 'PUT: Personnel Data is required' }, { status: 400});
//         }
        
//         let updated = await prisma.personnel.update({
//             where: { id },
//             data: data
//         });
//         return json(updated);   
//     } catch(err) {
//         console.error('GET /api/personnel/[id] error:', err);
//         return json({ error: 'Failed to update personnel' }, {status : 500});
//     }
// }

export const { GET, DELETE } = createHandlers('personnel', {
    include: {
        personnelonpd: true
    },
    logPrefix: 'personnel'
})