// GET AND POST ALL TRAINING ITEMS
import { createHandlers } from '$lib/functions/specificHandle';

export const { GET, POST } = createHandlers('training', {
    include: {pd: true},
    logPrefix: 'pd/training',
    useMany: true
})

// export const GET: RequestHandler = async() => {
//     try {
//         let roles = await prisma.training.findMany({
//             orderBy: {
//                 id: 'asc'
//             }, 
//             include: {
//                 pd: true
//             }
//         });
//         return json(roles);
//     } catch (err) {
//         console.error('GET /api/training error:', err);
//         return json({ error: 'Failed to retrieve all trainings' }, {status : 500});
//     }
// }

// export const POST: RequestHandler = async ({ request }) => {
//     try {
//         let data = await request.json();
//         if(!data) {
//             return json({ error: 'POST: Training Data is required' }, { status: 400});
//         }

//         let training = await prisma.training.create({
//             data: {
//                 type: data.type
//             } 
//         })

//         return json(training);
//     } catch (err) {
//         console.error('POST /api/training error:', err);
//         return json({ error: 'Failed to add training' }, {status : 500});
//     }
// }