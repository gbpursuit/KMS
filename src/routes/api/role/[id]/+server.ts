// GET, UPDATE, DELETE A SPECIFIC ROLE
import { createHandlers } from '$lib/functions/specificHandle';

export const { GET, PUT, DELETE } = createHandlers('role', {
    include: {
        perms: {
            include: {
                perms: true
            }
        }
    },
    logPrefix: 'role'
})

// export const PUT: RequestHandler = async ({ params, request }) => {
//     try {
//         let id = Number(params.id);
//         if(isNaN(id)) {
//             return json({ error: 'PUT: Invalid Role ID' }, { status: 400 });
//         }

//         let data = await request.json();

//         if(!data) {
//             return json({ error: 'PUT: Role Data is required' }, { status: 400});
//         }
        
//         let updated = await prisma.role.update({
//             where: { id },
//             data: data
//         });
//         return json(updated);   
//     } catch(err) {
//         console.error('GET /api/role/[id] error:', err);
//         return json({ error: 'Failed to update role' }, {status : 500});
//     }
// }
