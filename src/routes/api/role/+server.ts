// GET AND POST ALL ROLES
import { createHandlers } from '$lib/functions/specificHandle';

export const { GET, POST } = createHandlers('role', {
    include: {
        perms: {
            include: {
                perms: true
            }
        }
    },
    logPrefix: 'role',
    errorHandle: 'Entire Role',
    useMany: true
})

// export const GET: RequestHandler = async() => {
//     try {
//         let roles = await prisma.role.findMany({
//             orderBy: {
//                 id: 'asc'
//             },
//             include: {
//                 perms: {
//                     include: {
//                         perms: true
//                     }
//                 }
//             }
//         });
//         return json(roles);
//     } catch (err) {
//         console.error('GET /api/role error:', err);
//         return json({ error: 'Failed to retrieve all roles' }, {status : 500});
//     }
// }

// export const POST: RequestHandler = async ({ request }) => {
//     try {
//         let data = await request.json();
//         if(!data) {
//             return json({ error: 'POST: Role Data is required' }, { status: 400});
//         }

//         let role = await prisma.role.create({
//             data: data 
//         })

//         return json(role)
//     } catch (err) {
//         console.error('POST /api/role error:', err);
//         return json({ error: 'Failed to add role' }, {status : 500});
//     }
// }