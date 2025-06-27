// GET AND POST ALL PERMS
import { createHandlers } from '$lib/functions/specificHandle';

export const { GET, POST } = createHandlers('permission', {
    logPrefix: 'permission',
    errorHandle: 'Entire Permission',
    useMany: true
})

// export const GET: RequestHandler = async() => {
//     try {
//         let permission = await prisma.permission.findMany({
//             orderBy: {
//                 id: 'asc'
//             },
//         });
//         return json(permission);
//     } catch (err) {
//         console.error('GET /api/permission error:', err);
//         return json({ error: 'Failed to retrieve all permission' }, {status : 500});
//     }
// }

// export const POST: RequestHandler = async ({ request }) => {
//     try {
//         let data = await request.json();
//         if(!data) {
//             return json({ error: 'POST: Permission Data is required' }, { status: 400});
//         }
        
//         let role = await prisma.permission.create({
//             data: data
//         })
//         return json(role)
//     } catch (err) {
//         console.error('POST /api/permission error:', err);
//         return json({ error: 'Failed to add permission' }, {status : 500});
//     }
// }