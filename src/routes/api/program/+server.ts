// GET AND POST ALL PROGRAMS
import { createHandlers } from '$lib/functions/specificHandle';

export const { GET, POST } = createHandlers('program', {
    include: {
        _count: {
            select: {  // return the count of pd items
                research: true,
                cd: true,
                pd: true,
                extension: true
            } 
        }
    },
    logPrefix: 'program',
    errorHandle: 'Entire Program',
    useMany: true
})

// export const GET: RequestHandler = async() => {
//     try {
//         let programs = await prisma.program.findMany({
//             orderBy: {
//                 id: 'asc'
//             },
//             include: {
//                 pd: true
//             }
//         });
//         return json(programs);
//     } catch (err) {
//         console.error('GET /api/program error:', err);
//         return json({ error: 'Failed to retrieve all programs' }, {status : 500});
//     }
// }

// export const POST: RequestHandler = async ({ request }) => {
//     try {
//         let { name } = await request.json();
//         if(!name || typeof name !== 'string') {
//             return json({ error: 'POST: Program Name is required' }, { status: 400});
//         }

//         let program = await prisma.program.create({
//             data: { name }
//         })

//         return json(program)
//     } catch (err) {
//         console.error('POST /api/program error:', err);
//         return json({ error: 'Failed to add program' }, {status : 500});
//     }
// }