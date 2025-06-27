// GET AND POST ALL PDs 
import { createHandlers } from '$lib/functions/specificHandle';

export const { GET, POST } = createHandlers('professionalDevelopment', {
    logPrefix: 'pd',
    useMany: true
})

// export const GET: RequestHandler = async() => {
//     try {
//         let PD = await prisma.professionalDevelopment.findMany({
//             orderBy: {
//                 id: 'asc'
//             }
//         });
//         return json(PD);
//     } catch (err) {
//         console.error('GET /api/professionalDevelopment error:', err);
//         return json({ error: 'Failed to retrieve all professionalDevelopment' }, {status : 500});
//     }
// }

// export const POST: RequestHandler = async ({ request }) => {
//     try {   
//         let data = await request.json();
//         if(!data) {
//             return json({ error: 'POST: Professional Development Data is required' }, { status:400 });
//         }

//         let PD = await prisma.professionalDevelopment.create({
//             data
//         })

//         return json(PD)

//     } catch (err) {
//         console.error('POST /api/professionalDevelopment error:', err);
//         return json({ error: 'Failed to retrieve add professionalDevelopment' }, {status : 500});
//     }
// }