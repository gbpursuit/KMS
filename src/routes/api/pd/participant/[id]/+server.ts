// GET, UPDATE, DELETE A SPECIFIC PARTICIPANT
import { createHandlers } from '$lib/functions/specificHandle';

// export const PUT: RequestHandler = async ({ params, request }) => {
//     let id = Number(params.id);
//     if(isNaN(id)) {
//         return json({ error: 'PUT: Invalid Participant ID' }, { status: 400 });
//     }
//     try {
//         let data = await request.json();

//         if(!data) {
//             return json({ error: 'PUT: Participant Data is required' }, { status: 400});
//         }
        
//         let updated = await prisma.participant.update({
//             where: { id },
//             data: data
//         });
//         return json(updated);   
//     } catch(err) {
//         console.error('GET /api/participant/[id] error:', err);
//         return json({ error: 'Failed to update participant' }, {status : 500});
//     }
// }

export const { GET, PUT, DELETE } = createHandlers('participant', {
    include: {
        participantonpd: true
    },
    logPrefix: 'participant'
})