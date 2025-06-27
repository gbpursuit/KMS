// GET, UPDATE, DELETE A SPECIFIC PERM
import { createHandlers } from '$lib/functions/specificHandle';

// export const PUT: RequestHandler = async ({ params, request }) => {
//     try {
//         let id = Number(params.id);
//         if(isNaN(id)) {
//             return json({ error: 'PUT: Invalid Perms ID' }, { status: 400 });
//         }

//         let data = await request.json();

//         if(!data) {
//             return json({ error: 'PUT: Permission Data is required' }, { status: 400});
//         }
        
//         let updated = await prisma.permission.update({
//             where: { id },
//             data: data
//         });
//         return json(updated);   
//     } catch(err) {
//         console.error('GET /api/permission/[id] error:', err);
//         return json({ error: 'Failed to update permission' }, {status : 500});
//     }
// }

export const { GET, PUT, DELETE } = createHandlers('permission', {
    logPrefix: 'permission',
    errorHandle: 'Permission',
})