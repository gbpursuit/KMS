// GET AND POST ALL PERSONNEL ITEMS
import { createHandlers } from '$lib/functions/specificHandle';

export const { GET, POST } = createHandlers('personnel', {
    include: {personnelonpd: true},
    logPrefix: 'pd/personnel',
    errorHandle: 'Entire Personnel',
    useMany: true
})

// export const GET: RequestHandler = async() => {
//     try {
//         let roles = await prisma.personnel.findMany({
//             orderBy: {
//                 id: 'asc'
//             }, 
//             include: {
//                 personnelonpd: true
//             }
//         });
//         return json(roles);
//     } catch (err) {
//         console.error('GET /api/personnel error:', err);
//         return json({ error: 'Failed to retrieve all personnels' }, {status : 500});
//     }
// }

// export const POST: RequestHandler = async ({ request }) => {
//     try {
//         let data = await request.json();
//         if(!data) {
//             return json({ error: 'POST: Personnel Data is required' }, { status: 400});
//         }

//         let personnel = await prisma.personnel.create({
//             data: data 
//         })

//         return json(personnel);
//     } catch (err) {
//         console.error('POST /api/personnel error:', err);
//         return json({ error: 'Failed to add personnel' }, {status : 500});
//     }
// }