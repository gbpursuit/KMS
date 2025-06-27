// GET AND POST ALL PARTICIPANTS ITEMS
import { createHandlers } from '$lib/functions/specificHandle';

export const { GET, POST } = createHandlers('professionalDevelopment', {
    include: {participantonpd: true},
    logPrefix: 'pd/participant ',
    errorHandle: 'Entire Participant',
    useMany: true
})

// export const GET: RequestHandler = async() => {
//     try {
//         let roles = await prisma.participant.findMany({
//             orderBy: {
//                 id: 'asc'
//             }, 
//             include: {
//                 participantonpd: true
//             }
//         });
//         return json(roles);
//     } catch (err) {
//         console.error('GET /api/participant error:', err);
//         return json({ error: 'Failed to retrieve all participants' }, {status : 500});
//     }
// }

// export const POST: RequestHandler = async ({ request }) => {
//     try {
//         let data = await request.json();
//         if(!data) {
//             return json({ error: 'POST: Participant Data is required' }, { status: 400});
//         }

//         let participant = await prisma.participant.create({
//             data: {
//                 item: data.item
//             } 
//         })

//         return json(participant);
//     } catch (err) {
//         console.error('POST /api/participant error:', err);
//         return json({ error: 'Failed to add participant' }, {status : 500});
//     }
// }